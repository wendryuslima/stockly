"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createProductsSchema } from "./schema";

export type CreateProductsSchema = z.infer<typeof createProductsSchema>;

export const createProducts = async (data: CreateProductsSchema) => {
  createProductsSchema.parse(data);

  await db.product.create({
    data,
  });
  revalidatePath("/products");
};
