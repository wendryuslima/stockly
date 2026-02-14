/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
DROP COLUMN "unitPrice";

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
