import "server-only";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";

export interface DayTotalRevenue {
  dayTotal: string;
  totalRevenue: number;
}
interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboardData = async (): Promise<DashboardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];
  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;
      `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysRevenue.push({
      dayTotal: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0]?.totalRevenue ?? 0),
    });
  }
  console.log({ totalLast14DaysRevenue });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const totalRevenuePromise = db.$queryRaw<Array<{ totalRevenue: number }>>`
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
  `;

  const todayRevenuePromise = db.$queryRaw<
    Array<{ todayRevenue: number | string | null }>
  >`
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "todayRevenue"
  FROM "SaleProduct"
  JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
  WHERE "Sale"."date" >= ${startOfToday} AND "Sale"."date" <= ${endOfToday};
  `;
  const totalSalesPromise = db.sale.count();
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalProductsPromise = await db.product.count();

  const [
    totalRevenueRows,
    todayRevenueRows,
    totalSales,
    totalStock,
    totalProducts,
  ] = await Promise.all([
    totalRevenuePromise,
    todayRevenuePromise,
    totalSalesPromise,
    totalStockPromise,
    totalProductsPromise,
  ]);

  return {
    totalRevenue: Number(totalRevenueRows[0]?.totalRevenue ?? 0),
    todayRevenue: Number(todayRevenueRows[0]?.todayRevenue ?? 0),
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalLast14DaysRevenue,
  };
};
