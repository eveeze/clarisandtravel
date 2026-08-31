-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledBy" TEXT,
ADD COLUMN     "commission" INTEGER NOT NULL DEFAULT 15000,
ADD COLUMN     "commissionPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "commissionPaidAt" TIMESTAMP(3),
ADD COLUMN     "downPayment" INTEGER,
ADD COLUMN     "driverAssignedAt" TIMESTAMP(3),
ADD COLUMN     "driverId" INTEGER,
ADD COLUMN     "packageName" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentRef" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'belum',
ADD COLUMN     "pickupLocation" TEXT,
ADD COLUMN     "refundAmount" INTEGER,
ADD COLUMN     "refundedAt" TIMESTAMP(3),
ADD COLUMN     "remainingDue" INTEGER,
ADD COLUMN     "totalPrice" INTEGER,
ADD COLUMN     "tourTime" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vehicleId" INTEGER;

-- Backfill existing bookings with a unique bookingCode before adding the unique constraint
UPDATE "Booking" SET "bookingCode" = 'CLR-' || to_char("createdAt", 'YYYY') || '-' || lpad(("id")::text, 4, '0') WHERE "bookingCode" = '';

-- CreateTable
CREATE TABLE "BookingHistory" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "from" TEXT,
    "to" TEXT NOT NULL,
    "note" TEXT,
    "changedBy" TEXT NOT NULL DEFAULT 'system',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'tersedia',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "packageId" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingHistory_bookingId_idx" ON "BookingHistory"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_bookingId_key" ON "Review"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingCode_key" ON "Booking"("bookingCode");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_tourDate_idx" ON "Booking"("tourDate");

-- CreateIndex
CREATE INDEX "Booking_phone_idx" ON "Booking"("phone");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
