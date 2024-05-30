-- CreateEnum
CREATE TYPE "UserStatuses" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('VISITOR', 'PILOTE', 'RESPO', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" "UserStatuses" NOT NULL DEFAULT 'INACTIF',
    "role" "UserRoles" NOT NULL DEFAULT 'VISITOR',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
