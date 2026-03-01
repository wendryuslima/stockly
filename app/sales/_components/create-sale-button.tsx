"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import type { Product } from "@/lib/generated/prisma";
import { ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";

interface UpsertSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
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
        isSheetOpen={isSheetOpen}
        setSheetIsOpen={setIsSheetOpen}
        {...props}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
