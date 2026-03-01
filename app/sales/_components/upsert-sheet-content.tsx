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
  SheetFooter,
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
import type { Product } from "@/lib/generated/prisma";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import z from "zod";

import SalesTableDropdownMenu from "./table-dropdown-menu";
import { upsertSale } from "@/app/_actions/sales/upsert-sales";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

type SelectProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

interface UpsertSheetContentProps {
  saleId?: string;
  products: Product[];
  productOptions: ComboboxOption[];
  setSheetIsOpen: (open: boolean) => void;
  isSheetOpen: boolean;
  defaultSelectedProducts?: SelectProduct[];
}

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
  saleId,
  products,
  productOptions,
  setSheetIsOpen,
  defaultSelectedProducts,
  isSheetOpen,
}: UpsertSheetContentProps) => {
  const [selectProduct, setSelectProduct] = useState<SelectProduct[]>(
    defaultSelectedProducts ?? [],
  );

  const { execute: executeUpsertSale, isPending } = useAction(upsertSale, {
    onError: ({ error }) => {
      const flattenedErrors = error.validationErrors
        ? flattenValidationErrors(error.validationErrors)
        : null;
      toast.error(
        error.serverError ??
          flattenedErrors?.formErrors[0] ??
          "Erro ao relizar venda",
      );
      console.log({ error });
    },
    onSuccess: () => {
      toast.success("Venda realizada com successo");
      setSheetIsOpen(false);
    },
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (isSheetOpen) return;
    form.reset({
      productId: "",
      quantity: 1,
    });
    setSelectProduct(defaultSelectedProducts ?? []);
  }, [defaultSelectedProducts, form, isSheetOpen]);
  const onSubmit = (data: FormSchemaType) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    const existingProduct = selectProduct.find(
      (product) => product.id === selectedProduct.id,
    );
    const currentQuantity = existingProduct?.quantity ?? 0;
    const productIsOutOfstock =
      currentQuantity + data.quantity > selectedProduct.stock;
    if (productIsOutOfstock) {
      form.setError("quantity", {
        message: "Quantidade indisponível em estoque",
      });
      return;
    }

    if (existingProduct) {
      setSelectProduct(
        selectProduct.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                quantity: product.quantity + data.quantity,
              }
            : product,
        ),
      );
    } else {
      setSelectProduct([
        ...selectProduct,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ]);
    }

    console.log(selectedProduct);
  };

  const productTotal = useMemo(() => {
    return selectProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectProduct]);

  const handleDeleteProduct = (productId: string) => {
    setSelectProduct((prev) => {
      return prev.filter((product) => product.id !== productId);
    });
  };

  const handleSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      product: selectProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  const hasProduct = selectProduct.length === 0;
  return (
    <SheetContent className="!max-w-[600px] overflow-auto rounded-lg">
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
                <FormControl className="flex">
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
            <TableHead>Preço</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.quantity * product.price)}
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
      <SheetFooter className="pt-6">
        <Button
          disabled={hasProduct || isPending}
          onClick={handleSubmitSale}
          className="w-full gap-2"
        >
          {isPending ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              ...Carregando
            </>
          ) : (
            "Finalizar venda"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
