import "server-only";

import { Product } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany();
  return products;
};

export const cacheGetProduct = unstable_cache(getProducts, ["getProducts"], {
  tags: ["get-products"],
  revalidate: 10,
});
