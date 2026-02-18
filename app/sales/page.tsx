import { ComboboxOption } from "@/components/ui/combobox";
import TitlePages from "../_components/title-pages";

import { getProducts } from "../_data-access/products/get-products";

import UpsertSaleButton from "./_components/create-sale-button";
import { DataTable } from "@/components/ui/data-table";
import { saleTableColums } from "./_components/table.colums";
import { getSales } from "../_data-access/sales/get-sales";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    label: `${product.name} - ${product.stock}`,
    value: product.id,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productsOptions,
  }));

  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Vendas" description="Gestão de vendas" />
        <UpsertSaleButton
          products={products}
          productOptions={productsOptions}
        />
      </div>
      <div className="w-full">
        <DataTable columns={saleTableColums} data={tableData} />
      </div>
    </div>
  );
};

export default SalesPage;
