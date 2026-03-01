"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  MoreHorizontalIcon,
  ClipboardPaste,
  Trash2Icon,
  PencilIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteSaleContent from "./delete-dialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/components/ui/combobox";
import type { Product } from "@/lib/generated/prisma";
import type { GetSalesDto } from "@/app/_data-access/sales/get-sales";

interface SalesDropdownMenuProps {
  id: string;
  productsOptions: ComboboxOption[];
  products: Product[];
  saleProducts: GetSalesDto["saleProducts"];
}

const SalesDropdownMenu = ({
  id,
  productsOptions,
  products,
  saleProducts,
}: SalesDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(id)}
                className="flex cursor-pointer gap-2"
              >
                <ClipboardPaste />
                Copiar ID
              </DropdownMenuItem>

              <SheetTrigger asChild>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(id)}
                  className="flex cursor-pointer gap-2"
                >
                  <PencilIcon />
                  Editar
                </DropdownMenuItem>
              </SheetTrigger>

              <AlertDialogTrigger className="" asChild>
                <DropdownMenuItem className="flex cursor-pointer gap-2">
                  <Trash2Icon />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteSaleContent id={id} />
      </AlertDialog>

      <UpsertSheetContent
        saleId={id}
        isSheetOpen={upsertSheetIsOpen}
        defaultSelectedProducts={saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
        productOptions={productsOptions}
        products={products}
        setSheetIsOpen={setUpsertSheetIsOpen}
      />
    </Sheet>
  );
};

export default SalesDropdownMenu;
