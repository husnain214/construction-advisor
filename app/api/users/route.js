import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const GET = async (request) => {
  const userRole = request.cookies.get('role')?.value;

  if (userRole !== 'admin') {
    return NextResponse.json('only admin has access', { status: 401 });
  }

  const users = await prisma.user.findMany({});

  return NextResponse.json(users);
};
