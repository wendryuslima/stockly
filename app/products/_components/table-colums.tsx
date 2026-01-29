"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  CircleIcon,
  ClipboardPaste,
  MoreHorizontalIcon,
  SquarePen,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProductContent from "./delete-dialog";
import UpsertProductsDialog from "./upsert-products-dialog";

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
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="">
          <UpsertProductsDialog
            title="Editar produto"
            setOpen={setIsEditOpen}
            description="Edite as informações do produto"
          />
        </DialogContent>
      </Dialog>

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
                onClick={() => navigator.clipboard.writeText(product.id)}
                className="flex cursor-pointer gap-2"
              >
                <ClipboardPaste />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer gap-2"
                onClick={() => setIsEditOpen(true)}
              >
                <SquarePen />
                Editar
              </DropdownMenuItem>
              <AlertDialogTrigger className="" asChild>
                <DropdownMenuItem className="flex cursor-pointer gap-2">
                  <Trash2Icon />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteProductContent id={product.id} />
      </AlertDialog>
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
