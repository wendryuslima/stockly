import TitlePages from "../_components/title-pages";
import TotalRevenueCard from "../sales/_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TodayRevenueCard from "../sales/_components/today-revenue-card";
import TotalSaleCard from "../sales/_components/total-sale-card";
import TotalStock from "../sales/_components/total-stock-card";
import TotalProductsCard from "../sales/_components/total-products-card";
import Last14DaysRevenueCard from "../sales/_components/last-14-days-revenue-card";
import MostSoldProducts from "../sales/_components/most-sold-products-card";

const HomePage = async () => {
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
        <Suspense fallback={<Skeleton />}>
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
