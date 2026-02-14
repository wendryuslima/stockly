"use server";

import { db } from "@/lib/prisma";
import { createSaleSchema } from "./schema";

import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const crateSaleAction = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { product } }) => {
    await db.$transaction(async (trx) => {
      const sale = await db.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const products of product) {
        const productsFromDb = await db.product.findUnique({
          where: {
            id: products.id,
          },
        });
        if (!productsFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Products not found"],
          });
        }

        const productsIsOutOfStock = products.quantity > productsFromDb.stock;

        if (productsIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Produts not found"],
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
  });
