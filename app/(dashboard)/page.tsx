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

const SummaryCardSkeleton = () => {
  return (
    <div className="gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};

const RevenueChartSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

const MostSoldProductsSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
      <Skeleton className="h-5 w-28" />
      <div className="mt-2 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-8/12" />
      </div>
    </div>
  );
};

const HomePage = async () => {
  return (
    <div className="flex w-full flex-col space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Dashboard" description="Visão geral do sistema" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSaleCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalStock />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-4">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense fallback={<MostSoldProductsSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
