import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const DELETE = async (_, { params }) => {
  const { bidId } = params;

  try {
    const bid = await prisma.bid.delete({
      where: {
        id: bidId,
      },
    });

    await prisma.jobPost.update({
      where: {
        id: bid.jobId,
      },
      data: {
        cost: null,
        contractor: null,
        status: 'pending',
      },
    });
    return NextResponse.json({ message: 'bid deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
