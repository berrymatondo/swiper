-- CreateTable
CREATE TABLE "evang" (
    "id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "nPar" INTEGER NOT NULL DEFAULT 0,
    "nEva" INTEGER NOT NULL DEFAULT 0,
    "nGag" INTEGER NOT NULL DEFAULT 0,
    "nCon" INTEGER NOT NULL DEFAULT 0,
    "nInv" INTEGER NOT NULL DEFAULT 0,
    "nVen" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "celluleId" INTEGER,
    "zoneId" INTEGER,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "evang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "evang" ADD CONSTRAINT "evang_celluleId_fkey" FOREIGN KEY ("celluleId") REFERENCES "cellules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evang" ADD CONSTRAINT "evang_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
