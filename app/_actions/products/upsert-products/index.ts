"use server";

import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";
import { upsertProductSchema } from "./schema";

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;

export const upsertProducts = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    await db.product.upsert({
      where: { id: parsedInput.id ?? "" },
      update: parsedInput,
      create: parsedInput,
    });
    revalidatePath("/", "layout");
  });
