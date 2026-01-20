"use client";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Loader2, PlusIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import {
  createProducts,
  CreateProductsSchema,
} from "@/app/_actions/products/create-products";
import { createProductsSchema } from "@/app/_actions/products/create-products/schema";

const AddProductsButton = () => {
  const form = useForm<CreateProductsSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductsSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: CreateProductsSchema) => {
    setIsLoading(true);
    try {
      await createProducts(data);
      setOpen(false);
    } catch (error) {
      console.log("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          Adicionar produto
          <PlusIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <DialogHeader>
              <DialogTitle>Criar produto</DialogTitle>
              <DialogDescription>
                Insira as informações do produto
              </DialogDescription>
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
    </Dialog>
  );
};

export default AddProductsButton;
