import { NextRequest, NextResponse } from "next/server";
import { Product } from "../../../../types/product";
import productsData from "../../../../data/products.json";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/products.json");

const products: Product[] = productsData.map((p) => ({
  ...p,
  status: p.status === "active" || p.status === "out-of-stock" ? p.status : "active",
}));

function saveProductsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
}

// The important part: context.params should NOT be typed as a Promise
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // <-- this is correct
) {
  const { id } = context.params;
  const product = products.find((p) => p.id === id);

  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const body = (await req.json()) as Partial<Product>;

  const validStatus: "active" | "out-of-stock" =
    body.status === "active" || body.status === "out-of-stock"
      ? body.status
      : products[index].status;

  products[index] = { ...products[index], ...body, status: validStatus };

  saveProductsToFile();

  return NextResponse.json(products[index]);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const deletedProduct = products.splice(index, 1)[0];
  saveProductsToFile();

  return NextResponse.json({
    message: "Deleted successfully",
    deletedId: deletedProduct.id,
  });
}
