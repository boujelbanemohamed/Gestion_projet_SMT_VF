-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "attachments" JSONB,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "referenceNumber" TEXT;
