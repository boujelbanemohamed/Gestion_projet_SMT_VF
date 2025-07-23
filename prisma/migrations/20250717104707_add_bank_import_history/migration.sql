-- CreateTable
CREATE TABLE "BankImportHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "pdfPath" TEXT NOT NULL,

    CONSTRAINT "BankImportHistory_pkey" PRIMARY KEY ("id")
);
