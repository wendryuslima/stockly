import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertProductsDialog from "./upsert-products-dialog";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
const EditProductButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2">
        <PencilIcon size={14} />
        Editar
      </DialogTrigger>
      <DialogContent className="">
        <UpsertProductsDialog
          title="Editar produto"
          setOpen={setOpen}
          description="Edite as informações do produto"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductButton;
