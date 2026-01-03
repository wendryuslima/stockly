"use client";

import { Product } from "@/lib/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

export type Products = {
  id: string;
  name: string;
  unitPrice: number;
  stock: number;
  status: string;
};

export const productColumDef: ColumnDef<Product>[] = [
  {
    id: "products",
    accessorKey: "products",
    header: "Produtos",
  },

  {
    id: "unitPrice",
    accessorKey: "unitPrice",
    header: "Valor unitário",
  },
  {
    id: "stock",
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
  },
];
