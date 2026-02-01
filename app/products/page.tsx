import { productColumDef } from "./_components/table-colums";
import { DataTable } from "@/components/ui/data-table";
import { cacheGetProduct } from "../_data-access/products/get-products";
import TitlePages from "../_components/title-pages";

const Products = async () => {
  const products = await cacheGetProduct();
  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <TitlePages title="Produtos" description="Gestão de produtos"  />

      <div className="w-full">
        <DataTable columns={productColumDef} data={products} />
      </div>
    </div>
  );
};

export default Products;
