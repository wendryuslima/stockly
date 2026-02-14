"use client";
import {
  upsertProducts,
  UpsertProductSchema,
} from "@/app/_actions/products/upsert-products";
import { upsertProductSchema } from "@/app/_actions/products/upsert-products/schema";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { flattenValidationErrors } from "next-safe-action";

interface UpsertProductsDialogProps {
  defaultValues?: UpsertProductSchema;
  onSuccess?: () => void;
  title?: string;
  description: string;
}

const UpsertProductsDialog = ({
  title,
  onSuccess,
  description,
  defaultValues,
}: UpsertProductsDialogProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const { execute: executeUpsertProducts, status } = useAction(upsertProducts, {
    onSuccess: () => {
      if (defaultValues?.id) {
        toast.success("Produto atualizado com sucesso");
      } else {
        toast.success("Produto criado com sucesso");
      }
      onSuccess?.();
    },
    onError: ({ error }) => {
      const flattenedErrors = error.validationErrors
        ? flattenValidationErrors(error.validationErrors)
        : null;
      toast.error(
        error.serverError ??
          flattenedErrors?.formErrors[0] ??
          "Erro ao atualizar o produto",
      );
      console.log("Error updating product:", error);
    },
  });
  const isLoading = status === "executing";

  const onSubmit = async (data: UpsertProductSchema) => {
    executeUpsertProducts({ ...data, id: defaultValues?.id });
  };
  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor unitário</FormLabel>
                <FormControl>
                  <NumericFormat
                    customInput={Input}
                    value={field.value ?? ""}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    prefix="R$ "
                    placeholder="Digite o preço"
                    onValueChange={(values) =>
                      field.onChange(values.floatValue ?? 0)
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Estoque"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-4 flex w-full items-center justify-center gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div>
                  <Button variant="ghost" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </Button>
                </div>
              ) : (
                "Adicionar produto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductsDialog;
