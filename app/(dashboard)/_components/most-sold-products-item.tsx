import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-most-sold-products";
import { formatCurrency } from "@/app/helpers/currency";
import { Badge } from "@/components/ui/badge";

interface MostSoldProductsItemProps {
  product: MostSoldProductDto;
}

const soldLabel = (total: number) => (total === 1 ? "Vendido" : "Vendidos");

const MostSoldProductsItem = ({ product }: MostSoldProductsItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <div className="mb-2">
          {product.status === "IN_STOCK" ? (
            <Badge className="bg-[#EBFAF7] text-xs text-[#00A180] hover:bg-transparent">
              Em estoque
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-xs text-red-500">Esgotado</Badge>
          )}
        </div>
        <p className="text-sm font-medium">{product.name}</p>
        <p className="text-sm text-slate-400">
          {formatCurrency(product.price)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">
          {Number(product.totalSold)} {soldLabel(Number(product.totalSold))}
        </p>
      </div>
    </div>
  );
};

export default MostSoldProductsItem;
