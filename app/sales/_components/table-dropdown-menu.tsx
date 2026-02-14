"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/generated/prisma";

import { MoreHorizontalIcon, ClipboardPaste, Trash2Icon } from "lucide-react";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdownMenu = ({
  onDelete,
  product,
}: TableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
            className="flex cursor-pointer gap-2"
          >
            <ClipboardPaste />
            Copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onDelete(product.id)}
            className="flex cursor-pointer gap-2"
          >
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SalesTableDropdownMenu;
