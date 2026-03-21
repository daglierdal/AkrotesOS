-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOQItem" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "pozNo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "materialUnitPrice" DECIMAL(10,2) NOT NULL,
    "laborUnitPrice" DECIMAL(10,2) NOT NULL,
    "totalUnitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "vatRate" DECIMAL(5,2) NOT NULL DEFAULT 20,
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BOQItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOQSubDetail" (
    "id" TEXT NOT NULL,
    "boqItemId" TEXT NOT NULL,
    "location" TEXT,
    "quantity" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BOQSubDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Discipline_projectId_idx" ON "Discipline"("projectId");

-- CreateIndex
CREATE INDEX "Discipline_tenantId_idx" ON "Discipline"("tenantId");

-- CreateIndex
CREATE INDEX "Section_disciplineId_idx" ON "Section"("disciplineId");

-- CreateIndex
CREATE INDEX "Section_tenantId_idx" ON "Section"("tenantId");

-- CreateIndex
CREATE INDEX "BOQItem_sectionId_idx" ON "BOQItem"("sectionId");

-- CreateIndex
CREATE INDEX "BOQItem_tenantId_idx" ON "BOQItem"("tenantId");

-- CreateIndex
CREATE INDEX "BOQItem_pozNo_idx" ON "BOQItem"("pozNo");

-- CreateIndex
CREATE INDEX "BOQSubDetail_boqItemId_idx" ON "BOQSubDetail"("boqItemId");

-- CreateIndex
CREATE INDEX "BOQSubDetail_tenantId_idx" ON "BOQSubDetail"("tenantId");

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOQItem" ADD CONSTRAINT "BOQItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOQSubDetail" ADD CONSTRAINT "BOQSubDetail_boqItemId_fkey" FOREIGN KEY ("boqItemId") REFERENCES "BOQItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
