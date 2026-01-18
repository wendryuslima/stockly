import { db } from "@/lib/prisma";

export async function GET() {
  const products = await db.product.findMany({});
  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await db.product.create({
    data: {
      name: body.name,
      price: body.price,
      stock: body.stock,
    },
  });
  return Response.json(product, {
    status: 201,
  });
}
