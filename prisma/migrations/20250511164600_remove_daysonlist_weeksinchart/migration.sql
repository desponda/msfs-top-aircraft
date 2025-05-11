/*
  Warnings:

  - You are about to drop the column `daysOnList` on the `AircraftVote` table. All the data in the column will be lost.
  - You are about to drop the column `weeksInChart` on the `AircraftVote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AircraftVote" DROP COLUMN "daysOnList",
DROP COLUMN "weeksInChart";
