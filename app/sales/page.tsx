import { ComboboxOption } from "@/components/ui/combobox";
import TitlePages from "../_components/title-pages";

import { getProducts } from "../_data-access/products/get-products";

import CreateSaleButton from "./_components/create-sale-button";

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
        <CreateSaleButton
          products={products}
          productOptions={productsOptions}
        />
      </div>
    </div>
  );
};

export default SalesPage;
