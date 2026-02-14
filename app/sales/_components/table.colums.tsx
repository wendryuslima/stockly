"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { GetSalesDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/helpers/currency";

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
    cell: () => {
      return (
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      );
    },
  },
];
