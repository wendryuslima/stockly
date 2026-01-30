import z from "zod";

export const upsertProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Nome do produto é obrigatório" })
    .trim()
    .max(50),
  price: z.number().min(0.01, { message: "Valor unitário é obrigatório" }),
  stock: z
    .number()
    .positive()
    .int()
    .min(1, { message: "Estoque é obrigatório" }),
});
