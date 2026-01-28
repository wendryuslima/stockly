"use server";

import { db } from "@/lib/prisma";
import { DeleteProductSchema, DeleteProductSchemaType } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteProducts = async ({ id }: DeleteProductSchemaType) => {
  DeleteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath  ("/products");
};
