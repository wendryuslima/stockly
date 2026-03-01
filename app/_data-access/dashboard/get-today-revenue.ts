import { db } from "@/lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayRevenue = await db.$queryRaw<
    Array<{ todayRevenue: number | null }>
  >`
        SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "todayRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= ${startOfToday} AND "Sale"."date" <= ${endOfToday};
      `;

  return todayRevenue[0]?.todayRevenue ?? 0;
};
