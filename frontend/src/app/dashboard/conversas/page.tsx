
'use client';

import { useEffect, useState } from 'react';

interface Conversa {
id: number;
chatId: string;
mensagem: string;
resposta: string;
dataHora: string;
resolvido: boolean;
}

export default function ConversasPage() {
const [conversas, setConversas] = useState<Conversa[]>([]);

useEffect(() => {
    fetch('/api/conversas')
    .then(res => res.json())
    .then(data => setConversas(data));
}, []);

return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">📋 Histórico de Conversas</h1>
    <div className="space-y-4">
        {conversas.map(c => (
        <div key={c.id} className="border p-4 rounded-xl shadow bg-white">
            <div><strong>🆔 Chat:</strong> {c.chatId}</div>
            <div><strong>🕒 Data:</strong> {new Date(c.dataHora).toLocaleString()}</div>
            <div><strong>🙋 Usuário:</strong> {c.mensagem}</div>
            <div><strong>🤖 Assistente:</strong> {c.resposta}</div>
            <div><strong>✅ Resolvido:</strong> {c.resolvido ? 'Sim' : 'Não'}</div>
        </div>
        ))}
    </div>
    </div>
);
}
