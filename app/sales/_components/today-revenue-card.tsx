import SummaryCard, {
  SummaryCardicon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalRevenue } from "@/app/_data-access/dashboard/get-today-revenue";
import { formatCurrency } from "@/app/helpers/currency";
import { DollarSign } from "lucide-react";

const TodayRevenueCard = async () => {
  const todayRevenue = await getTotalRevenue();
  return (
    <SummaryCard>
      <SummaryCardicon>
        <DollarSign className="h-4 w-4" />
      </SummaryCardicon>
      <SummaryCardTitle>Receita hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};
export default TodayRevenueCard;
