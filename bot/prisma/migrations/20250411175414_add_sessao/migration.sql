/*
  Warnings:

  - Added the required column `data` to the `Conversa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Conversa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvido" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Conversa" ("chatId", "dataHora", "id", "mensagem", "resolvido", "resposta") SELECT "chatId", "dataHora", "id", "mensagem", "resolvido", "resposta" FROM "Conversa";
DROP TABLE "Conversa";
ALTER TABLE "new_Conversa" RENAME TO "Conversa";
CREATE UNIQUE INDEX "Conversa_sessionId_key" ON "Conversa"("sessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
