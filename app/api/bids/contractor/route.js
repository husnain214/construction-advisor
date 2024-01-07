import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  const contractorId = request.headers.get('user');

  try {
    const bids = await prisma.bid.findMany({
      where: {
        contractorId,
      },
    });
    return NextResponse.json(bids);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
