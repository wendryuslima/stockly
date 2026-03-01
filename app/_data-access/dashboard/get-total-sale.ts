import { db } from "@/lib/prisma";

export const getTotalSale = async (): Promise<number> => {
  const totalSales = await db.sale.count();
  return totalSales;
};
