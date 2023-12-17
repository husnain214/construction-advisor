import { NextResponse } from 'next/server';

import { prisma } from '@/libs/prisma';

export const GET = async (request) => {
  const id = request.headers.get('user');

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const contactsID = user.contacts;

    const promiseArray = contactsID.map((contactId) =>
      prisma.user.findUnique({
        where: {
          id: contactId,
        },
        select: {
          id: true,
          name: true,
          picture: true,
          role: true,
          email: true,
        },
      }),
    );

    const contacts = await Promise.all(promiseArray);

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};

export const dynamic = 'foce-dynamic';
