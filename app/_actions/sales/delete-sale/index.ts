"use server";

import { actionClient } from "@/lib/safe-action";
import { DeleteProductSchema } from "../../products/delete-products/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(DeleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({
      where: {
        id,
      },
    });

    revalidatePath("/sales");
  });
