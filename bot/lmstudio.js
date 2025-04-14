const axios = require('axios');

async function perguntarDeepSeek(mensagem) {
try {
    const res = await axios.post(
    'http://localhost:1234/v1/chat/completions',
    {
        model: "deepseek-chat",
        stream: true,
        messages: [
            { role: "system", content: "Você é um assistente que responde sempre em **português do Brasil**, Suas respostas devem ser curtas, diretas, educadas e apenas com a informação necessária. Evite repetir perguntas e nunca dê informações irrelevantes." },
            { role: "user", content: mensagem }
        ]
    },
    {
        responseType: 'stream'
    }
    );

    return await new Promise((resolve, reject) => {
    let resposta = '';
    
    res.data.on('data', (chunk) => {
        const linhas = chunk.toString().split('\n');
        for (const linha of linhas) {
        if (linha.startsWith('data: ')) {
            const json = linha.replace('data: ', '').trim();
            if (json === '[DONE]') return;

            try {
            const delta = JSON.parse(json);
            const content = delta.choices?.[0]?.delta?.content;
            if (content) resposta += content;
            } catch (e) {
            console.error('Erro ao processar JSON da stream:', e.message);
            }
        }
        }
    });

    res.data.on('end', () => {
        resolve(resposta || '⚠️ Sem resposta do modelo.');
    });

    res.data.on('error', (err) => {
        reject('⚠️ Erro na stream: ' + err.message);
    });
    });

} catch (err) {
    console.error('Erro ao chamar DeepSeek:', err.message || err);
    return '⚠️ Desculpe, houve um erro ao acessar o suporte automático.';
}
}

module.exports = {
perguntarDeepSeek
};