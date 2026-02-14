"use client";

import { deleteProducts } from "@/app/_actions/products/delete-products";
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

interface DeleteProductContentProps {
  id: string;
}

const DeleteProductContent = ({ id }: DeleteProductContentProps) => {
  const { execute: executeDeleteProduct, status } = useAction(deleteProducts, {
    onSuccess: () => {
      toast.success("Produto deletado com sucesso");
    },
    onError: ({ error }) => {
      const flattenedErrors = error.validationErrors
        ? flattenValidationErrors(error.validationErrors)
        : null;
      toast.error(
        error.serverError ??
          flattenedErrors?.formErrors[0] ??
          "Erro ao deletar o produto",
      );
      console.log("Error deleting product:", error);
    },
  });
  const isLoading = status === "executing";
  const handleDeleteClick = () => {
    executeDeleteProduct({ id });
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

export default DeleteProductContent;
