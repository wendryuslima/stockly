"use client";

import { formatCurrency } from "@/app/helpers/currency";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import z from "zod";

import SalesTableDropdownMenu from "./table-dropdown-menu";

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

type SelectProduct = Product & { quantity: number };

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce
    .number()
    .int()
    .positive("A quantidade deve ser um número positivo"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const UpsertSheetContent = ({
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [selectProduct, setSelectProduct] = useState<SelectProduct[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });
  const onSubmit = (data: FormSchemaType) => {
    const selectProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectProduct) return;
    setSelectProduct((prev) => {
      const existingProduct = prev.find(
        (product) => product.id === selectProduct.id,
      );
      if (existingProduct) {
        return prev.map((product) =>
          product.id === selectProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product,
        );
      }

      return [
        ...prev,
        {
          ...selectProduct,
          quantity: data.quantity,
        },
      ];

      form.reset();
    });

    console.log(selectProduct);
  };

  const productTotal = useMemo(() => {
    return selectProduct.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [selectProduct]);

  const handleDeleteProduct = (productId: string) => {
    setSelectProduct((prev) => {
      return prev.filter((product) => product.id !== productId);
    });
  };
  return (
    <SheetContent className="!max-w-[600px] rounded-lg">
      <SheetHeader>
        <SheetTitle>Adicionar venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex gap-2" variant="secondary">
            <PlusIcon size={14} />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionado a venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(Number(product.price))}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.quantity * Number(product.price))}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu
                  onDelete={handleDeleteProduct}
                  product={product}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>${formatCurrency(productTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
};

export default UpsertSheetContent;
