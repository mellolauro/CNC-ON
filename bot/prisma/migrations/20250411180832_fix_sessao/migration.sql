/*
  Warnings:

  - You are about to drop the `Conversa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Conversa";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Sessao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "modo" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessao_chatId_key" ON "Sessao"("chatId");
