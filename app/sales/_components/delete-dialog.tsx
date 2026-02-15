"use client";

import { deleteSale } from "@/app/_actions/sales/delete-sale";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteSaleContentProps {
  id: string;
}

const DeleteSaleContent = ({ id }: DeleteSaleContentProps) => {
  const { execute: executeSale, status } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso");
    },
    onError: ({ error }) => {
      const flattenedErrors = error.validationErrors
        ? flattenValidationErrors(error.validationErrors)
        : null;
      toast.error(
        error.serverError ??
          flattenedErrors?.formErrors[0] ??
          "Erro ao deletar a venda",
      );
      console.log("Error deleting sale:", error);
    },
  });
  const isLoading = status === "executing";
  const handleDeleteClick = () => {
    executeSale({ id });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Deseja realmente excluir este produto?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClick} disabled={isLoading}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteSaleContent;
