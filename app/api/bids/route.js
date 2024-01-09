import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async () => {
  try {
    const bids = await prisma.bid.findMany({});

    return NextResponse.json(bids);
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

export const POST = async (request) => {
  const bidDetails = await request.json();
  const contractorId = request.headers.get('user');
  const { jobId } = bidDetails;

  try {
    const savedBid = await prisma.bid.create({
      data: { ...bidDetails, contractorId },
    });

    await prisma.jobPost.update({
      where: { id: jobId },
      data: { bids: { connect: { id: savedBid.id } } },
    });

    await prisma.user.update({
      where: { id: contractorId },
      data: { bids: { connect: { id: savedBid.id } } },
    });

    return NextResponse.json(savedBid, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
