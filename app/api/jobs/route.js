import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const POST = async (request) => {
  const jobDetails = await request.json();
  const id = request.headers.get('user');
  const data = {
    ...jobDetails,
    customerId: id,
  };

  try {
    const savedPost = await prisma.jobPost.create({ data });
    await prisma.user.update({
      where: { id },
      data: { jobs: { connect: { id: savedPost.id } } },
    });

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async () => {
  try {
    const jobPosts = await prisma.jobPost.findMany({});

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
