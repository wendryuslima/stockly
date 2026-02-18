import "server-only";

import { Product } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";



export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany();
  return products;
};
