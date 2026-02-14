import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  MoreHorizontalIcon,
  ClipboardPaste,
  SquarePen,
  Trash2Icon,
} from "lucide-react";
import DeleteProductContent from "./delete-dialog";
import UpsertProductsDialog from "./upsert-products-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { Product } from "@/lib/generated/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductsDropdownMenuProps {
  product: Product;
}

const ProductsDropdownMenu = ({ product }: ProductsDropdownMenuProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="flex cursor-pointer gap-2"
                  onClick={() => setIsEditOpen(true)}
                >
                  <SquarePen />
                  Editar
                </DropdownMenuItem>
              </DialogTrigger>

              <AlertDialogTrigger className="" asChild>
                <DropdownMenuItem className="flex cursor-pointer gap-2">
                  <Trash2Icon />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductsDialog
          title="Editar produto"
          onSuccess={() => setIsEditOpen(false)}
          description="Edite as informações do produto"
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
        />
        <DeleteProductContent id={product.id} />
      </AlertDialog>
    </Dialog>
  );
};

export default ProductsDropdownMenu;
