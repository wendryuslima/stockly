"use server";

import { db } from "@/lib/prisma";
import { upsertSaleSchema } from "./schema";

import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { product, id } }) => {
    const isUpdate = Boolean(id);

    await db.$transaction(async (trx) => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });
        if (!existingSale) return;
        await trx.sale.delete({
          where: { id },
        });
        for (const product of existingSale.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }

      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const products of product) {
        const productsFromDb = await trx.product.findUnique({
          where: {
            id: products.id,
          },
        });
        if (!productsFromDb) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Products not found"],
          });
        }

        const productsIsOutOfStock = products.quantity > productsFromDb.stock;

        if (productsIsOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Products out of stock"],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: products.id,
            quantity: products.quantity,
            unitPrice: productsFromDb.price,
          },
        });
        await trx.product.update({
          where: {
            id: products.id,
          },
          data: {
            stock: {
              decrement: products.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/products");
    revalidatePath("/sales");
  });
