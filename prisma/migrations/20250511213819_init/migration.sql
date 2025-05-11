-- CreateEnum
CREATE TYPE "CompatibilityStatus" AS ENUM ('Native', 'Compatible', 'Not_Compatible');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('monthly', 'yearly');

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "payware" TEXT NOT NULL,
    "msrp" INTEGER,
    "buyUrl" TEXT NOT NULL,
    "previewImageUrl" TEXT,
    "description" TEXT,
    "tags" TEXT[],
    "dateAdded" TIMESTAMP(3),
    "msfs2020Compatibility" "CompatibilityStatus",
    "msfs2024Compatibility" "CompatibilityStatus",

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftVote" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "aircraftId" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "positionChange" INTEGER,
    "rank" INTEGER,

    CONSTRAINT "AircraftVote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AircraftVote" ADD CONSTRAINT "AircraftVote_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftVote" ADD CONSTRAINT "AircraftVote_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
