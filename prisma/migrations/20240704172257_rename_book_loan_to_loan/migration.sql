/*
  Warnings:

  - You are about to drop the `BookLoan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookLoan" DROP CONSTRAINT "BookLoan_book_fkey";

-- DropForeignKey
ALTER TABLE "BookLoan" DROP CONSTRAINT "BookLoan_member_fkey";

-- DropTable
DROP TABLE "BookLoan";

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "member" INTEGER NOT NULL,
    "book" INTEGER NOT NULL,
    "borrowAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" TIMESTAMP(3),
    "isReturned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_member_fkey" FOREIGN KEY ("member") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_book_fkey" FOREIGN KEY ("book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
