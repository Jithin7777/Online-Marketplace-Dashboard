import { NextRequest, NextResponse } from "next/server";
import productsData from "../../../data/products.json";
import { Product } from "../../../types/product";
import fs from "fs";
import path from "path";

let products: Product[] = productsData.map((p) => ({
  ...p,
  status:
    p.status === "active" || p.status === "out-of-stock" ? p.status : "active",
}));

const filePath = path.join(process.cwd(), "src/data/products.json");

function saveProductsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let filtered = [...products];
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.vendor.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered.sort((a: any, b: any) => {
    if (sortOrder === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
    page,
    limit,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validStatus: "active" | "out-of-stock" =
      body.status === "active" || body.status === "out-of-stock"
        ? body.status
        : "active";

    const newProduct: Product = {
      ...body,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: validStatus,
    };

    products.push(newProduct);
    saveProductsToFile();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
