/*
  Warnings:

  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_book_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_member_fkey";

-- DropTable
DROP TABLE "Loan";

-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "member" INTEGER NOT NULL,
    "book" INTEGER NOT NULL,
    "borrowAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" TIMESTAMP(3),
    "isReturned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_member_fkey" FOREIGN KEY ("member") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_book_fkey" FOREIGN KEY ("book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
