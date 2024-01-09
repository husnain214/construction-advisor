import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async (request) => {
  const url = new URL(request.url);
  const jobId = url.searchParams.get('JobPostId');

  try {
    const bids = await prisma.bid.findMany({
      where: {
        jobId,
      },
    });
    return NextResponse.json(bids);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
