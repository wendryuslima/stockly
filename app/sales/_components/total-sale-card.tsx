import SummaryCard, {
  SummaryCardicon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalSale } from "@/app/_data-access/dashboard/get-total-sale";
import { CircleDollarSign } from "lucide-react";

const TotalSaleCard = async () => {
  const totalSales = await getTotalSale();

  return (
    <SummaryCard>
      <SummaryCardicon>
        <CircleDollarSign className="h-4 w-4" />
      </SummaryCardicon>
      <SummaryCardTitle>Vendas totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSaleCard;
