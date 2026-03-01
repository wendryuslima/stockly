import "server-only";

import { Product } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";

export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK";
export interface ProductDto extends Product {
  status: ProductStatus;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany();
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
