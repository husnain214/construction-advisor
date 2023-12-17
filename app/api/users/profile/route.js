import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async (request) => {
  const userRole = request.cookies.get('role').value;

  try {
    const id = request.headers.get('user');

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
        bids: userRole === 'contractor',
        jobs: userRole === 'customer',
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
