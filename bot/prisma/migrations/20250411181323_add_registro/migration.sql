-- CreateTable
CREATE TABLE "Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "ultimaMensagem" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
