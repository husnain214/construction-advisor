import { NextResponse } from 'next/server';
import helpers from '@/helpers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request) => {
  try {
    const id = await helpers.getTokenData(request);
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
