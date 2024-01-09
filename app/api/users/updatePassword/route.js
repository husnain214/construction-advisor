import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const PUT = async (request) => {
  const id = await request.headers.get('user');
  const { password } = await request.json();

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
    });

    return NextResponse.json(updatedUser);
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
};
