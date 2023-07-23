/*
  Warnings:

  - You are about to drop the column `date` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `Availability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "date",
DROP COLUMN "times",
ADD COLUMN     "dateTimes" TIMESTAMP(3)[];
