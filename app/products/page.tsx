import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { productColumDef } from "./_components/table-colums";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";

const Products = async () => {
  const products = await db.product.findMany({});
  return (
    <div className="flex w-full flex-col items-center space-y-8 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-primary">Produtos</h1>
          <h2 className="text-2xl font-semibold">Gestão de produtos</h2>
        </div>

        <Button className="flex items-center">
          <PlusIcon size={14} />
          Novo produto
        </Button>
      </div>

      <div className="w-full">
        <DataTable columns={productColumDef} data={products} />
      </div>
    </div>
  );
};

export default Products;
