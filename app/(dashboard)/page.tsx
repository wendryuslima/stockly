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

const HomePage = async () => {
  const { todayRevenue, totalProducts, totalSales, totalStock, totalRevenue } =
    await getDashboardData();
  return (
    <div className="w-full flex-col space-y-8 p-8">
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
    </div>
  );
};

export default HomePage;
