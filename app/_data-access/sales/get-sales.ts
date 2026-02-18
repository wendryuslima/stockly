import "server-only";

import { db } from "@/lib/prisma";

interface SaleProductsDto {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface GetSalesDto {
  id: string;
  productName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductsDto[];
}
export const getSales = async (): Promise<GetSalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  });
  return sales.map(
    (sale): GetSalesDto => ({
      id: sale.id,
      date: sale.date,
      productName: sale.saleProducts
        .map((saleProduct) => saleProduct.product.name)
        .join(" • "),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      saleProducts: sale.saleProducts.map((saleProduct) => ({
        productId: saleProduct.productId,
        name: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
        productName: saleProduct.product.name,
      })),
    }),
  );
};
