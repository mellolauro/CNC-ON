import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
const dados = await prisma.registro.findMany({
    orderBy: { atualizadoEm: 'desc' },
});

return NextResponse.json(dados);
}
