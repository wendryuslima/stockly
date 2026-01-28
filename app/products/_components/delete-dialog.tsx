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
import { toast } from "sonner";

interface DeleteProductContentProps {
  id: string;
}

const DeleteProductContent = ({ id }: DeleteProductContentProps) => {
  const handleDeleteClick = async () => {
    try {
      await deleteProducts({ id });
      toast.success("Produto deletado com sucesso");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Erro ao deletar o produto");
    }
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
        <AlertDialogAction onClick={handleDeleteClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductContent;
