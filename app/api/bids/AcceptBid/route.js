import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const POST = async (request) => {
  const url = new URL(request.url);
  const bidId = url.searchParams.get('BidId');

  try {
    const bid = await prisma.bid.findUnique({
      where: {
        id: bidId,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: bid.contractorId,
      },
    });

    const updatedBid = await prisma.bid.update({
      where: {
        id: bidId,
      },
      data: {
        successful: true,
      },
    });

    const updatedJob = await prisma.jobPost.update({
      where: {
        id: bid.jobId,
      },
      data: {
        cost: bid.amount,
        contractor: user.name,
        status: 'ongoing',
      },
    });

    return NextResponse.json({ updatedBid, updatedJob });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
