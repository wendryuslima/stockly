"use client";
import { Button } from "@/components/ui/button";
import { NumericFormat } from 'react-number-format';

import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormLabel, FormItem, FormField, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  name: z.string().min(1, { message: "Nome do produto é obrigatório" }).trim().max(50),
  price: z.number().min(0.01, { message: "Valor unitário é obrigatório" }),
  stock: z.number().positive().int().min(1, { message: "Estoque é obrigatório" }),
})

type FormSchema = z.infer<typeof formSchema>;

const AddProductsButton = () => {
  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  })

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  }


  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="flex items-center">
          Adicionar produto
          <PlusIcon size={14} />

        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <DialogHeader>
              <DialogTitle>Criar produto</DialogTitle>
              <DialogDescription>Insira as informações do produto</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl >
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
                  <FormControl >
                    <NumericFormat
                      id="price"
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowNegative={false}
                      prefix="R$"
                      customInput={Input}
                      onValueChange={(value) => field.onChange(value.floatValue)}
                      onChange={() => { }}
                      placeholder="Digite o preço"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField

              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl >
                    <Input type="number" placeholder="Estoque" {...field} />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <DialogFooter className="flex items-center mt-4 gap-2 justify-center w-full">
              <DialogClose asChild>
                <Button className="w-full" variant='outline'>Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="w-full">Adicionar produto</Button>
            </DialogFooter>


          </form>
        </Form>

      </DialogContent>

    </Dialog>
  );
}

export default AddProductsButton;