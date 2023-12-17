import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const POST = async (request) => {
  const id = await request.headers.get('user');
  const { password } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return NextResponse.json(
        { error: 'invalid password' },
        {
          status: 401,
        },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      },
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json({ message: 'password is correct' }, { status: 200 });
};
