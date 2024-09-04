/*
  Warnings:

  - You are about to drop the column `grpWhatsapp` on the `cellules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cellules" DROP COLUMN "grpWhatsapp",
ADD COLUMN     "grpWhatsApp" TEXT;
