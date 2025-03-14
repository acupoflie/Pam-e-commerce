/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'English',
    "genres" TEXT[],
    "pageCount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "status" "StockStatus" NOT NULL DEFAULT 'InStock',
    "rating" INTEGER,
    "totalReviews" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
