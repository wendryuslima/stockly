import {
  CircleDollarSign,
  DollarSign,
  Package,
  ShoppingBasket,
} from "lucide-react";
import TitlePages from "../_components/title-pages";
import SummaryCard, {
  SummaryCardicon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboardData } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../helpers/currency";
import RevenueCharts from "./_components/revenue-charts";

const HomePage = async () => {
  const {
    todayRevenue,
    totalProducts,
    totalSales,
    totalStock,
    totalRevenue,
    totalLast14DaysRevenue,
  } = await getDashboardData();
  return (
    <div className="flex w-full flex-col space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Dashboard" description="Visão geral do sistema" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardicon>
            <DollarSign className="h-4 w-4" />
          </SummaryCardicon>
          <SummaryCardTitle>Receita total</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardicon>
            <DollarSign className="h-4 w-4" />
          </SummaryCardicon>
          <SummaryCardTitle>Receita hoje</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardicon>
            <CircleDollarSign className="h-4 w-4" />
          </SummaryCardicon>
          <SummaryCardTitle>Vendas totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardicon>
            <Package className="h-4 w-4" />
          </SummaryCardicon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardicon>
            <ShoppingBasket className="h-4 w-4" />
          </SummaryCardicon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
        <p className="text-xl font-semibold text-slate-900">Receita</p>
        <p className="text-sm text-slate-400">Últimos 14 dias</p>
        <RevenueCharts data={totalLast14DaysRevenue} />
      </div>
    </div>
  );
};

export default HomePage;
