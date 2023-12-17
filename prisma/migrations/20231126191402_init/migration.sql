/*
  Warnings:

  - You are about to drop the column `bidAmount` on the `JobPost` table. All the data in the column will be lost.
  - You are about to drop the column `contractorName` on the `JobPost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Bid` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Cost` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractor` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "successful" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "bidAmount",
DROP COLUMN "contractorName",
ADD COLUMN     "Cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contractor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bid_jobId_key" ON "Bid"("jobId");
