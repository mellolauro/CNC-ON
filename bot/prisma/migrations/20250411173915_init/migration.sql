-- CreateTable
CREATE TABLE "Conversa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvido" BOOLEAN NOT NULL DEFAULT false
);
