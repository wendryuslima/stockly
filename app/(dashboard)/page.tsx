import TitlePages from "../_components/title-pages";
import { getDashboardData } from "../_data-access/dashboard/get-dashboard";

import RevenueCharts from "./_components/revenue-charts";
import MostSoldProductsItem from "./_components/most-sold-products-item";
import TotalRevenueCard from "../sales/_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TodayRevenueCard from "../sales/_components/today-revenue-card";
import TotalSaleCard from "../sales/_components/total-sale-card";
import TotalStock from "../sales/_components/total-stock-card";
import TotalProductsCard from "../sales/_components/total-products-card";

const HomePage = async () => {
  const {
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboardData();

  return (
    <div className="flex w-full flex-col space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Dashboard" description="Visão geral do sistema" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton className="bg-slate-200" />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<Skeleton className="h-4 w-4" />}>
          <TotalSaleCard />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-4 w-4" />}>
          <TotalStock />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-4 w-4" />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-4">
        <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
          <p className="text-[18px] font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueCharts data={totalLast14DaysRevenue} />
        </div>

        <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
          <p className="text-[18px] font-semibold text-slate-900">
            Mais vendidos
          </p>
          {mostSoldProducts.map((product) => (
            <MostSoldProductsItem
              key={product.name}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                totalSold: product.totalSold,
                status: product.status,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
