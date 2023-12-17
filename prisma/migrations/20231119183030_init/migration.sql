/*
  Warnings:

  - The values [customer,contractor,admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `bidderId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `JobPost` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `JobPost` table. All the data in the column will be lost.
  - Added the required column `contractorId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'CONTRACTOR', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_bidderId_fkey";

-- DropForeignKey
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_authorId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "bidderId",
DROP COLUMN "title",
ADD COLUMN     "contractorId" TEXT NOT NULL,
ADD COLUMN     "jobId" TEXT NOT NULL,
ALTER COLUMN "amount" DROP DEFAULT;

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "authorId",
DROP COLUMN "desc",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
