"use server";

import { actionClient } from "@/lib/safe-action";
import { DeleteProductSchema } from "../../products/delete-products/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(DeleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.findUnique({
        where: { id },
        include: { saleProducts: true },
      });

      if (!sale) return;

      for (const saleProduct of sale.saleProducts) {
        await trx.product.update({
          where: { id: saleProduct.productId },
          data: {
            stock: {
              increment: saleProduct.quantity,
            },
          },
        });
      }

      await trx.sale.delete({
        where: { id },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/products");
  });
