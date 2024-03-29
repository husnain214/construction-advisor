import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const POST = async (request) => {
  const user = await request.json();

  const {
    email,
    password,
    name,
    age,
    gender,
    dob,
    cnic,
    phone,
    picture,
    role,
  } = user;

  const existingUser = await prisma.user.findMany({
    where: {
      email,
    },
  });

  if (existingUser.length > 0) {
    return NextResponse.json(
      { error: 'email must be unique' },
      {
        status: 400,
      },
    );
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const data = {
      email,
      passwordHash,
      name,
      age,
      gender,
      dob,
      cnic,
      phone,
      picture,
      role,
    };

    const createdUser = await prisma.user.create({ data });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      },
    );
  } finally {
    await prisma.$disconnect();
  }
};
