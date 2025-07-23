/*
  Warnings:

  - A unique constraint covering the columns `[bankCode]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `Bank` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bankCode` on table `Bank` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bank" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "bankCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_bankCode_key" ON "Bank"("bankCode");
