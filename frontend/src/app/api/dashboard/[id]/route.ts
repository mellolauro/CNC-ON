import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
const id = parseInt(params.id);
const { resolvido } = await req.json();

const conversa = await prisma.conversa.update({
    where: { id },
    data: { resolvido },
});

return NextResponse.json(conversa);
}
