import { NextRequest, NextResponse } from 'next/server';
import productsData from '../../../../data/products.json';
import { Product } from '../../../../types/product';
import fs from 'fs';
import path from 'path';
const filePath = path.join(process.cwd(), 'src/data/products.json');

function saveProductsToFile() {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}

let products: Product[] = productsData.map(p => ({
  ...p,
  status: (p.status === 'active' || p.status === 'out-of-stock') ? p.status : 'active'
}));

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const index = products.findIndex(p => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const body = await req.json();

  const validStatus: 'active' | 'out-of-stock' =
    body.status === 'active' || body.status === 'out-of-stock'
      ? body.status
      : products[index].status; 

  products[index] = { ...products[index], ...body, status: validStatus };

  return NextResponse.json(products[index]);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const index = products.findIndex(p => p.id.toString() === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const deletedProduct = products.splice(index, 1)[0];

    saveProductsToFile();

    return NextResponse.json({
      message: "Deleted successfully",
      deletedId: deletedProduct.id
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
