import { productColumDef } from "./_components/table-colums";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "../_data-access/products/get-products";
import AddProductsButton from "./_components/add-products-buttont";
import TitlePages from "../_components/title-pages";

const Products = async () => {
  const products = await getProducts();
  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <TitlePages title="Produtos" description="Gestão de produtos" />

        <AddProductsButton title="Adicionar produto" />
      </div>

      <div className="w-full">
        <DataTable columns={productColumDef} data={products} />
      </div>
    </div>
  );
};

export default Products;
