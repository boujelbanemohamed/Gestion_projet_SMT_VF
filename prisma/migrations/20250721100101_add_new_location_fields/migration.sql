-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "description" TEXT,
ADD COLUMN     "modifiedAt" TIMESTAMP(3),
ADD COLUMN     "securityLevel" TEXT;
