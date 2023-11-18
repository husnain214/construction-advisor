/*
  Warnings:

  - You are about to drop the column `authorId` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `bidderId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_authorId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "authorId",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bidderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "desc" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
