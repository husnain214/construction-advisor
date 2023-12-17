import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const DELETE = async (request) => {
  const id = request.headers.get('user');
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
