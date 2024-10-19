/*
  Warnings:

  - You are about to drop the column `nCon` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `nIcc` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `nNIcc` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `nPar` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `nStar` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `onLine` on the `meetings` table. All the data in the column will be lost.
  - The `date` column on the `meetings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "meetings" DROP COLUMN "nCon",
DROP COLUMN "nIcc",
DROP COLUMN "nNIcc",
DROP COLUMN "nPar",
DROP COLUMN "nStar",
DROP COLUMN "onLine",
ADD COLUMN     "nEnf" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nFem" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nHom" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "date",
ADD COLUMN     "date" INTEGER NOT NULL DEFAULT 0;
