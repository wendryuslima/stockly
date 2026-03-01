"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/lib/generated/prisma";

import ProductsDropdownMenu from "./products-dropdown-menu";
import { Badge } from "@/components/ui/badge";

const getStatus = (stock: number) => {
  if (stock > 0) {
    return (
      <Badge className="rounded-md bg-[#EBFAF7] px-2 py-1 text-xs text-[#00A180] hover:bg-transparent">
        Em estoque
      </Badge>
    );
  }
  return (
    <Badge className="rounded-md bg-[#64748B1A] px-2 py-1 text-xs text-slate-500">
      Esgotado
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
      const label = getStatus(product.stock);
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
