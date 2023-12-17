import * as bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

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

  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Secret key is not defined' },
      {
        status: 500,
      },
    );
  }

  const token = await SignJWT(
    userForToken,
    new TextEncoder().encode(process.env.SECRET_KEY),
  );
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

  response.cookies.set('role', role, {
    httpOnly: true,
  });

  return response;
};
