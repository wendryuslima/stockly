"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { MoreHorizontalIcon, ClipboardPaste, Trash2Icon } from "lucide-react";

import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteSaleContent from "./delete-dialog";

interface SalesDropdownMenuProps {
  id: string;
}

const SalesDropdownMenu = ({ id }: SalesDropdownMenuProps) => {
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
                onClick={() => navigator.clipboard.writeText(id)}
                className="flex cursor-pointer gap-2"
              >
                <ClipboardPaste />
                Copiar ID
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
        <DeleteSaleContent id={id} />
      </AlertDialog>
    </Dialog>
  );
};

export default SalesDropdownMenu;
