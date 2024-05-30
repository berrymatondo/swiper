-- AlterTable
ALTER TABLE "users" ADD COLUMN     "celluleId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_celluleId_fkey" FOREIGN KEY ("celluleId") REFERENCES "cellules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
