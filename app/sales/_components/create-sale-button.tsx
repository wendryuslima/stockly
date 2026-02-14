"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Button className="flex items-center">
          Adicionar venda
          <PlusIcon size={14} /> 
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setIsSheetOpen(false)}
        {...props}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
