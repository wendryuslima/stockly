"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { GetSalesDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/helpers/currency";
import SalesDropdownMenu from "./sales.dropdown-menu";
import { Product } from "@/lib/generated/prisma";
import { ComboboxOption } from "@/components/ui/combobox";

interface SaleTableColum extends GetSalesDto {
  products: Product[];
  productsOptions: ComboboxOption[];
}

export const saleTableColums: ColumnDef<SaleTableColum>[] = [
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
        original: { id, products, productsOptions, saleProducts },
      },
    }) => {
      return (
        <SalesDropdownMenu
          id={id}
          products={products}
          productsOptions={productsOptions}
          saleProducts={saleProducts}
        />
      );
    },
  },
];
