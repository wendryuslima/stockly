import { productColumDef } from "./_components/table-colums";
import { DataTable } from "@/components/ui/data-table";
import { cacheGetProduct } from "../_data-access/products/get-products";
import AddProductsButton from "./_components/add-products-buttont";

const Products = async () => {
  const products = await cacheGetProduct();
  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-primary">Produtos</h1>
          <h2 className="text-2xl font-semibold">Gestão de produtos</h2>
        </div>

        <AddProductsButton />
      </div>

      <div className="w-full">
        <DataTable columns={productColumDef} data={products} />
      </div>
    </div>
  );
};

export default Products;
