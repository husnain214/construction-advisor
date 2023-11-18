import { NextResponse } from 'next/server';

export const middleware = (request) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/users', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
};

export const config = {
  matcher: ['/users', '/users/:path*', '/', '/signup'],
};
