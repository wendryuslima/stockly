"use client";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { PlusIcon } from "lucide-react";

import { useState } from "react";
import UpsertProductsDialog from "./upsert-products-dialog";

interface AddProductsButtonProps {
  title: string;
}

const AddProductsButton = ({ title }: AddProductsButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          {title}
          <PlusIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <UpsertProductsDialog
          onSuccess={() => setOpen(false)}
          description="Insira as informações do produto"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductsButton;
