import z, { string } from "zod";

export const DeleteSaleSchema = z.object({
  id: string().uuid(),
});

export type DeleteSaleSchemaType = z.infer<typeof DeleteSaleSchema>;
