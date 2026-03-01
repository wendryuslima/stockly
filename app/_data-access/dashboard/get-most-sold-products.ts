import { db } from "@/lib/prisma";
import { ProductStatus } from "../products/get-products";

export interface MostSoldProductDto {
  id: number;
  name: string;
  totalSold: number;
  price: number;
  status: ProductStatus;
}

export const getMostSoldProduct = async (): Promise<MostSoldProductDto[]> => {
  const mostSoldProductsQuery = `
        SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock"
        FROM "SaleProduct"
        JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
        GROUP BY "Product"."name", "Product"."price", "Product"."stock"
        ORDER BY "totalSold" DESC
        LIMIT 5;
      `;

  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      name: string;
      totalSold: number;
      price: number;
      stock: number;
      id: number;
    }[]
  >(mostSoldProductsQuery);

  return mostSoldProducts.map((product) => ({
    ...product,
    totalSold: Number(product.totalSold),
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
