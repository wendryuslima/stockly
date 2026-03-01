import SummaryCard, {
  SummaryCardicon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalQuery } from "@/app/_data-access/dashboard/get-total-revenue";
import { formatCurrency } from "@/app/helpers/currency";
import { DollarSign } from "lucide-react";


const TotalRevenueCard = async () => {
  const totalRevenue = await getTotalQuery();
  return (

      <SummaryCard>
        <SummaryCardicon>
          <DollarSign className="h-4 w-4" />
        </SummaryCardicon>
        <SummaryCardTitle>Receita total</SummaryCardTitle>
        <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
      </SummaryCard>
   
  );
};

export default TotalRevenueCard;
