/*
  Warnings:

  - You are about to drop the column `appliedDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "appliedDate",
DROP COLUMN "notes",
DROP COLUMN "updatedAt",
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
