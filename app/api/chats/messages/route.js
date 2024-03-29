import { NextResponse } from 'next/server';
import { pusherServer } from '../../../../libs/pusher';
import prisma from '@/libs/prisma';

export const POST = async (request) => {
  const message = await request.json();

  try {
    await pusherServer.trigger('chat', 'send-message', message);
    const createdMessage = await prisma.message.create({ data: message });
    await prisma.user.update({
      where: { id: message.senderId },
      data: { sentMessages: { connect: { id: createdMessage.id } } },
    });
    await prisma.user.update({
      where: { id: message.receiverId },
      data: {
        receivedMessages: { connect: { id: createdMessage.id } },
      },
    });

    return NextResponse.json(createdMessage);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
};
