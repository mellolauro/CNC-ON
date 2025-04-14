'use client';

import { useEffect, useState } from 'react';

type Conversa = {
id: number;
chatId: string;
usuario: string;
ultimaMensagem: string;
resposta: string;
origem: string;
dataHora: string;
};

export default function DashboardPage() {
const [conversas, setConversas] = useState<Conversa[]>([]);
const [busca, setBusca] = useState('');


useEffect(() => {
    const fetchConversas = () => {
        fetch('http://localhost:3333/api/dashboard')
            .then((res) => res.json())
            .then((data) => setConversas(data))
            .catch((err) => console.error('Erro ao buscar conversas:', err));
    };

    fetchConversas(); // busca imediatamente

    const interval = setInterval(fetchConversas, 5000); // busca a cada 5 segundos

    return () => clearInterval(interval); // limpa o intervalo se sair da página
}, []);

const conversasFiltradas = conversas.filter((c) =>
    `${c.chatId} ${c.ultimaMensagem} ${c.resposta}`.toLowerCase().includes(busca.toLowerCase())
);

return (
    <main className="min-h-screen bg-[#0D1B2A]p-6">
        <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold mb-4 text-[#0D1B2A]">
        Painel de Controle
        </h1>

    <input
        type="text"
        placeholder="🔍 Buscar por mensagem ou chatId..."
        className="mb-4 p-2 border rounded w-full text-gray-800 placeholder-gray-500"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
    />

        <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-200 text-[#0D1B2A]">
            <tr>
            <th className="border p-2">Chat ID</th>
            <th className="border p-2">Usuário</th>
            <th className="border p-2">Mensagem</th>
            <th className="border p-2">Resposta</th>
            <th className="border p-2">Origem</th>
            <th className="border p-2">Data/Hora</th>
            </tr>
        </thead>
        <tbody>
            {conversasFiltradas.map((c) => (
            <tr key={c.id}>
                <td className="border p-2">{c.chatId}</td>
                <td className="border p-2">{c.usuario}</td>
                <td className="border p-2">{c.ultimaMensagem}</td>
                <td className="border p-2">{c.resposta}</td>
                <td className="border p-2">{c.origem}</td>
                <td className="border p-2">{new Date(c.dataHora).toLocaleString()}</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
    </main>
);
}