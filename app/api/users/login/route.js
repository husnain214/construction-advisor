import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request) => {
  const credentials = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  const { id, email, name, age, gender, dob, cnic, phone, picture, role } =
    user || {};

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(credentials.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return NextResponse.json(
      { error: 'invalid email or password' },
      {
        status: 401,
      },
    );
  }

  const userForToken = {
    email: email,
    id: user.id,
  };

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Secret key is not defined' },
      {
        status: 500,
      },
    );
  }

  const token = jwt.sign(userForToken, secretKey);
  const authUser = {
    id,
    email,
    name,
    age,
    gender,
    dob,
    cnic,
    phone,
    picture,
    role,
  };

  const response = NextResponse.json(authUser, {
    status: 200,
  });

  response.cookies.set('token', token, {
    httpOnly: true,
  });

  return response;
};
