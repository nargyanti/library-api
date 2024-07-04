/*
  Warnings:

  - You are about to drop the column `borrowAt` on the `Borrow` table. All the data in the column will be lost.
  - You are about to drop the column `returnAt` on the `Borrow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrow" DROP COLUMN "borrowAt",
DROP COLUMN "returnAt",
ADD COLUMN     "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "returnedAt" TIMESTAMP(3);
