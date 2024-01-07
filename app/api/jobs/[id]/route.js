import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const PUT = async (request, { params }) => {
  const jobDetails = await request.json();

  try {
    const updatedJob = await prisma.jobPost.update({
      where: {
        id: params.id,
      },
      data: jobDetails,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await prisma.bid.deleteMany({
      where: {
        jobId: params.id,
      },
    });

    const deletedJob = await prisma.jobPost.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedJob);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
