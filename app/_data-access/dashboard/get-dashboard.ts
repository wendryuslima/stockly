import { db } from "@/lib/prisma";

interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
}

export const getDashboardData = async (): Promise<DashboardDto> => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const totalRevenuePromise = db.$queryRaw<
    Array<{ totalRevenue: number | string | null }>
  >`
    SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) AS "totalRevenue"
    FROM "SaleProduct";
  `;

  const todayRevenuePromise = db.$queryRaw<
    Array<{ todayRevenue: number | string | null }>
  >`
    SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) AS "todayRevenue"
    FROM "SaleProduct"
    WHERE "createdAt" >= ${startOfToday} AND "createdAt" <= ${endOfToday};
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
  };
};
