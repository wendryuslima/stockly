"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { SaleProduct } from "@prisma/client";

export const productColumDef: ColumnDef<SaleProduct>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Produtos",
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: "Quantidade de produtos",
  },
  {
    id: "unitPrice",
    accessorKey: "unitPrice",
    header: "Valor total",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Data",
  },
];
