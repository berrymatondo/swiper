/*
  Warnings:

  - Made the column `isActive` on table `parametres` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parametres" ALTER COLUMN "isActive" SET NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT false;
