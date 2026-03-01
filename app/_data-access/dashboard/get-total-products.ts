import { db } from "@/lib/prisma";

export const getTotalProducts = async (): Promise<number> => {
  const totalProducts = await db.product.count();
  return totalProducts;
};
