-- CreateEnum
CREATE TYPE "CelStatuses" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU');

-- CreateEnum
CREATE TYPE "ZonesStatuses" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU');

-- CreateTable
CREATE TABLE "zones" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "statut" "ZonesStatuses" NOT NULL DEFAULT 'INACTIF',
    "respoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cellules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hours" TEXT NOT NULL DEFAULT 'De 19h à 20h30',
    "days" TEXT NOT NULL DEFAULT 'Tous les jeudis',
    "statut" "CelStatuses" NOT NULL DEFAULT 'INACTIF',
    "zoneId" INTEGER,
    "addressId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cellules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "box" TEXT,
    "municipality" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT,
    "city" TEXT,
    "mobile" TEXT,
    "isIcc" BOOLEAN DEFAULT false,
    "isStar" BOOLEAN DEFAULT false,
    "isPilote" BOOLEAN DEFAULT false,
    "isRespo" BOOLEAN DEFAULT false,
    "celluleId" INTEGER,
    "addressId" INTEGER,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nCon" INTEGER NOT NULL DEFAULT 0,
    "nPar" INTEGER NOT NULL DEFAULT 0,
    "nStar" INTEGER NOT NULL DEFAULT 0,
    "nIcc" INTEGER NOT NULL DEFAULT 0,
    "nNIcc" INTEGER NOT NULL DEFAULT 0,
    "nNew" INTEGER NOT NULL DEFAULT 0,
    "onLine" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "celluleId" INTEGER,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zones_name_key" ON "zones"("name");

-- AddForeignKey
ALTER TABLE "zones" ADD CONSTRAINT "zones_respoId_fkey" FOREIGN KEY ("respoId") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cellules" ADD CONSTRAINT "cellules_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cellules" ADD CONSTRAINT "cellules_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_celluleId_fkey" FOREIGN KEY ("celluleId") REFERENCES "cellules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_celluleId_fkey" FOREIGN KEY ("celluleId") REFERENCES "cellules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
