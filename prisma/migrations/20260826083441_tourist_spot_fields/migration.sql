/*
  Warnings:

  - You are about to drop the column `image` on the `TouristSpot` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `TouristSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TouristSpot" DROP COLUMN "image",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "history" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
