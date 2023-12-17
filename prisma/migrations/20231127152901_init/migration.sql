/*
  Warnings:

  - You are about to drop the column `Cost` on the `JobPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "Cost",
ADD COLUMN     "cost" DOUBLE PRECISION;
