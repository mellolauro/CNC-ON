const express = require('express');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sessions = require('./sessions');
const { perguntarDeepSeek } = require('./lmstudio');
const { PrismaClient } = require('@prisma/client');
const dashboardRoutes = require('./api/dashboard');

const prisma = new PrismaClient();
const app = express();

// Middleware de API
app.use(cors()); 
app.use('/api/dashboard', dashboardRoutes);

// Inicia servidor backend para o painel
app.listen(3333, () => {
console.log('🚀 Backend rodando em http://localhost:3333');
});

// WhatsApp Bot
const client = new Client({
authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
console.log('✅ WhatsApp conectado!');
});

client.on('message', async (msg) => {
const chatId = msg.from;
const texto = msg.body.trim();
const nome = msg._data?.notifyName || 'Desconhecido';

const sessao = sessions.get(chatId);

  // Modo IA: DeepSeek
if (sessao?.modo === 'deepseek') {
    const resposta = await perguntarDeepSeek(texto);
    client.sendMessage(chatId, resposta);

    await prisma.sessao.upsert({
    where: { chatId },
    update: { modo: 'deepseek', status: 'ativo', nome },
    create: { chatId, modo: 'deepseek', status: 'ativo', nome },
    });

    await prisma.registro.create({
    data: {
        chatId,
        usuario: nome,
        ultimaMensagem: texto,
        resposta,
        origem: 'deepseek',
    },
    });

    // Emula o /start automaticamente
    await client.sendMessage(chatId, `👋 Olá! Como podemos ajudar?

        1️⃣ Fazer uma chamada com um atendente  
        2️⃣ Falar com nosso suporte automático 🤖  
        3️⃣ Enviar um e-mail ao suporte
        
        Digite o número da opção desejada.`);
        
    return;
}

  // Menu de opções
switch (texto) {
    case '/start':
    client.sendMessage(chatId, `👋 Olá! Como podemos ajudar?

1️⃣ Fazer uma chamada com um atendente  
2️⃣ Falar com nosso suporte automático 🤖  
3️⃣ Enviar um e-mail ao suporte

Digite o número da opção desejada.`);
    break;

    case '1':
    client.sendMessage(chatId, '📞 Ligue para nosso suporte: (11) 1234-5678');
    break;

    case '2':
    sessions.set(chatId, { modo: 'deepseek' });

    await prisma.sessao.upsert({
        where: { chatId },
        update: { modo: 'deepseek', status: 'ativo', nome },
        create: { chatId, modo: 'deepseek', status: 'ativo', nome },
    });

    client.sendMessage(chatId, '🤖 Você está agora falando com o assistente. Envie sua dúvida!');
    break;

    case '3':
    client.sendMessage(chatId, '📧 Envie um e-mail para suporte@empresa.com');
    break;

    case '/sair':
    sessions.remove(chatId);

    await prisma.sessao.updateMany({
        where: { chatId },
        data: { status: 'encerrado' },
    });

    client.sendMessage(chatId, '🛑 Sessão encerrada. Digite `/start` para começar novamente.');
    break;

    default:
    client.sendMessage(chatId, '❌ Comando não reconhecido. Digite `/start` para ver o menu.');
    break;
}
});

client.initialize();