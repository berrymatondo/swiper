-- AlterTable
ALTER TABLE "zones" ADD COLUMN     "evangId" INTEGER;

-- AddForeignKey
ALTER TABLE "zones" ADD CONSTRAINT "zones_evangId_fkey" FOREIGN KEY ("evangId") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
