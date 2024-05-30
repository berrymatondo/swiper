/*
  Warnings:

  - You are about to drop the column `isGest` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "isGest";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email";
