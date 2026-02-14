"use server";

import { db } from "@/lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  await db.$transaction(async (trx) => {
    const sale = await db.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const products of data.products) {
      const productsFromDb = await db.product.findUnique({
        where: {
          id: products.id,
        },
      });
      if (!productsFromDb) {
        throw new Error("Product not found");
      }

      const productsIsOutOfStock = products.quantity > productsFromDb.stock;

      if (productsIsOutOfStock) {
        throw new Error("Products out of stock");
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
};
