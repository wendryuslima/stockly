import { db } from "@/lib/prisma";

export const getTotalQuery = async (): Promise<number> => {
  const totalRevenue = await db.$queryRaw<Array<{ totalRevenue: number }>>`
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
  `;

  return totalRevenue[0]?.totalRevenue ?? 0;
};
