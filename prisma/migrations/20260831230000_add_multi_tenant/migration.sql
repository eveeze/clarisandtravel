-- CreateTable
CREATE TABLE "Tenant" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "whatsappNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- Insert default tenant (data existing dipindah ke tenant ini)
INSERT INTO "Tenant" ("id", "slug", "name", "whatsappNumber", "isActive", "createdAt", "updatedAt")
VALUES (1, 'jogja', 'Claris & City Tour Jogja', '6285779536859', true, NOW(), NOW());

-- AlterTable: tambah kolom tenantId dengan default 1, lalu drop default setelah backfill
ALTER TABLE "TourPackage" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Vehicle" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "BlogPost" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "TouristSpot" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Booking" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Driver" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "AdminUser" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "SiteContent" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "GalleryItem" ADD COLUMN "tenantId" INTEGER NOT NULL DEFAULT 1;

-- Drop constraint global unique lama (diganti composite unique per tenant)
ALTER TABLE "TourPackage" DROP CONSTRAINT IF EXISTS "TourPackage_slug_key";
ALTER TABLE "BlogPost" DROP CONSTRAINT IF EXISTS "BlogPost_slug_key";
ALTER TABLE "TouristSpot" DROP CONSTRAINT IF EXISTS "TouristSpot_slug_key";
ALTER TABLE "AdminUser" DROP CONSTRAINT IF EXISTS "AdminUser_email_key";
ALTER TABLE "SiteContent" DROP CONSTRAINT IF EXISTS "SiteContent_key_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");
CREATE INDEX "AdminUser_tenantId_idx" ON "AdminUser"("tenantId");
CREATE UNIQUE INDEX "AdminUser_tenantId_email_key" ON "AdminUser"("tenantId", "email");
CREATE INDEX "BlogPost_tenantId_idx" ON "BlogPost"("tenantId");
CREATE UNIQUE INDEX "BlogPost_tenantId_slug_key" ON "BlogPost"("tenantId", "slug");
CREATE INDEX "Booking_tenantId_idx" ON "Booking"("tenantId");
CREATE INDEX "Driver_tenantId_idx" ON "Driver"("tenantId");
CREATE INDEX "GalleryItem_tenantId_idx" ON "GalleryItem"("tenantId");
CREATE INDEX "SiteContent_tenantId_idx" ON "SiteContent"("tenantId");
CREATE UNIQUE INDEX "SiteContent_tenantId_key_key" ON "SiteContent"("tenantId", "key");
CREATE INDEX "TourPackage_tenantId_idx" ON "TourPackage"("tenantId");
CREATE UNIQUE INDEX "TourPackage_tenantId_slug_key" ON "TourPackage"("tenantId", "slug");
CREATE INDEX "TouristSpot_tenantId_idx" ON "TouristSpot"("tenantId");
CREATE UNIQUE INDEX "TouristSpot_tenantId_slug_key" ON "TouristSpot"("tenantId", "slug");
CREATE INDEX "Vehicle_tenantId_idx" ON "Vehicle"("tenantId");

-- Drop default supaya insert selanjutnya wajib nyebut tenantId
ALTER TABLE "TourPackage" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "Vehicle" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "BlogPost" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "TouristSpot" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "Driver" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "AdminUser" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "SiteContent" ALTER COLUMN "tenantId" DROP DEFAULT;
ALTER TABLE "GalleryItem" ALTER COLUMN "tenantId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "TourPackage" ADD CONSTRAINT "TourPackage_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TouristSpot" ADD CONSTRAINT "TouristSpot_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SiteContent" ADD CONSTRAINT "SiteContent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
