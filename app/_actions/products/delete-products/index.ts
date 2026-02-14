"use server";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { DeleteProductSchema } from "./schema";

export const deleteProducts = actionClient
  .schema(DeleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products");
  });
