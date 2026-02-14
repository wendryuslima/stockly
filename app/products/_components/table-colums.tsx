"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { CircleIcon } from "lucide-react";

import ProductsDropdownMenu from "./products-dropdown-menu";

const getStatus = (status: string) => {
  if (status === "IN_STOCK") {
    return (
      <Badge className="bg-[#EBFAF7] text-[#00A180]">
        <div className="flex items-center gap-1">
          <CircleIcon className="fill-[#00A180]" size={9} />
          Em estoque
        </div>
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#64748B1A] text-slate-500">
      <div className="flex items-center gap-1">
        <CircleIcon className="fill-slate-500" size={9} />
        Esgotado
      </div>
    </Badge>
  );
};

const ProductActions = ({ product }: { product: Product }) => {
  return (
    <>
      <ProductsDropdownMenu product={product} />
    </>
  );
};

export const productColumDef: ColumnDef<Product>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Produtos",
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    id: "stock",
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ row }) => {
      const product = row.original;
      return product.stock;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const label = getStatus(product.status);
      return label;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActions product={product} />;
    },
  },
];
