import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import TitlePages from "../_components/title-pages";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-access/products/get-products";
import { ComboboxOption } from "@/components/ui/combobox";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SalesPage = async () => {
  const products = await getProducts();
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Vendas" description="Gestão de vendas" />
        <Sheet>
          <SheetTrigger>
            <Button className="flex items-center">
              Adicionar venda
              <PlusIcon size={14} />
            </Button>
          </SheetTrigger>
          <UpsertSheetContent  products={products} productOptions={productsOptions} />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
