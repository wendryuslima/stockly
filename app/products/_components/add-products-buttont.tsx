"use client";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { PlusIcon } from "lucide-react";

import { useState } from "react";
import UpsertProductsDialog from "./upsert-products-dialog";

const AddProductsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          Adicionar produto
          <PlusIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <UpsertProductsDialog
          setOpen={setOpen}
          description="Insira as informações do produto"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductsButton;
