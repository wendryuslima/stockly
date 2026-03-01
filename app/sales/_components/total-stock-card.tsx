import SummaryCard, {
  SummaryCardicon,
  SummaryCardTitle,
  SummaryCardValue,
} from "@/app/(dashboard)/_components/summary-card";
import { getTotalStock } from "@/app/_data-access/dashboard/get-total-stock";
import { Package } from "lucide-react";

const TotalStock = async () => {
  const totalStock = await getTotalStock();
  return (
    <SummaryCard>
      <SummaryCardicon>
        <Package className="h-4 w-4" />
      </SummaryCardicon>
      <SummaryCardTitle>Total em estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalStock;
