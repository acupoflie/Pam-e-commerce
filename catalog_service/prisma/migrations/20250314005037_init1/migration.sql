-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('InStock', 'OutOfStock');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('English', 'Turkish', 'Russian');

-- CreateTable
CREATE TABLE "Product" (
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
