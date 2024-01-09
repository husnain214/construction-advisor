import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const PUT = async (request) => {
  const userId = request.headers.get('user');
  const { id: contactId } = await request.json();

  try {
    const customer = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        contacts: [...customer.contacts, contactId],
      },
    });

    const contractor = await prisma.user.findUnique({
      where: {
        id: contactId,
      },
    });

    await prisma.user.update({
      where: {
        id: contactId,
      },
      data: {
        contacts: [...contractor.contacts, userId],
      },
    });

    return NextResponse.json({ message: 'contact added' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
