-- AlterEnum
ALTER TYPE "UserRoles" ADD VALUE 'EVANG';

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "isEvang" BOOLEAN DEFAULT false;
