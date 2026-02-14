"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { upsertProductSchema } from "./schema";

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;

export const upsertProducts = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);

  await db.product.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });

  
  revalidatePath("/products");
};
