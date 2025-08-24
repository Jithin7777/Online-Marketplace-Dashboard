import { NextRequest, NextResponse } from "next/server";
import productsData from "../../../data/products.json";
import { Product } from "../../../types/product";
import fs from "fs";
import path from "path";

const products: Product[] = productsData.map((p) => ({
  ...p,
  status:
    p.status === "active" || p.status === "out-of-stock" ? p.status : "active",
}));

const filePath = path.join(process.cwd(), "src/data/products.json");

// Save products to JSON file
function saveProductsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sortBy = (searchParams.get("sortBy") || "createdAt") as keyof Product;
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let filtered = [...products];
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.vendor.toLowerCase().includes(lowerSearch)
    );
  }

  // Sort products
  filtered.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    return typeof aValue === "string"
      ? sortOrder === "asc"
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue)
      : sortOrder === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
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
