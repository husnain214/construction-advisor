import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async (request) => {
  const id = request.headers.get('user');

  try {
    const jobPosts = await prisma.jobPost.findMany({
      where: {
        customerId: id,
      },
    });

    return NextResponse.json(jobPosts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 400,
      },
    );
  } finally {
    await prisma.$disconnect();
  }
};
