import * as bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { createSecretKey } from 'crypto';

export async function POST(request) {
  const credentials = await request.json();

  console.log(credentials);

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

  const secretKey = createSecretKey(process.env.SECRET_KEY, 'utf-8');

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Secret key is not defined' },
      {
        status: 500,
      },
    );
  }

  const token = await new SignJWT(userForToken)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey);

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
}
