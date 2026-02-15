"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GetSalesDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/helpers/currency";
import SalesDropdownMenu from "./sales.dropdown-menu";

export const saleTableColums: ColumnDef<GetSalesDto>[] = [
  {
    id: "id",
    accessorKey: "productName",
    header: "Produtos",
  },

  {
    id: "total",
    header: "Quantidade",
    accessorKey: "totalAmount",
    cell: ({
      row: {
        original: { totalProducts },
      },
    }) => totalProducts,
  },

  {
    id: "quantity",
    accessorKey: "totalAmount",
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    id: "createdAt",
    accessorKey: "Data",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString(),
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Ações",
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return <SalesDropdownMenu id={id} />;
    },
  },
];
