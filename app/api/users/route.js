import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async (request) => {
  const userRole = request.cookies.get('role')?.value;

  if (userRole !== 'admin') {
    return NextResponse.json('only admin has access', { status: 401 });
  }

  const users = await prisma.user.findMany({});

  return NextResponse.json(users);
};

export const PUT = async (request) => {
  const userRole = request.cookies.get('role')?.value;
  const userDetails = await request.json();

  if (userRole !== 'admin') {
    return NextResponse.json('only admin has access', { status: 401 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userDetails.id,
      },
      data: {
        ...userDetails,
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
