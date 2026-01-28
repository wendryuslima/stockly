import z from "zod";

export const DeleteProductSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductSchemaType = z.infer<typeof DeleteProductSchema>;
