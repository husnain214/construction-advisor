/*
  Warnings:

  - Added the required column `siteName` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "siteName" TEXT NOT NULL;
