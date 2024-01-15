import { NextResponse } from 'next/server';
import helpers from './helpers';

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';
  const role = request.cookies.get('role')?.value || '';

  if (path.startsWith('/api')) {
    try {
      const headers = new Headers(request.headers);
      const { id } = await helpers.getTokenData(request);

      headers.set('user', id);

      return NextResponse.next({
        request: {
          headers,
        },
      });
    } catch (error) {
      return NextResponse.next();
    }
  }

  const notContractor =
    (role === 'customer' || role === 'admin') &&
    path.startsWith('/users/contractor');

  const notCustomer =
    (role === 'contractor' || role === 'admin') &&
    path.startsWith('/users/customer');

  const notAdmin =
    (role === 'contractor' || role === 'customer') && path.startsWith('/admin');

  const redirUrls = {
    customer: '/users/customer',
    contractor: '/users/contractor',
    admin: '/admin',
  };

  if ((isPublicPath && token) || notContractor || notCustomer || notAdmin) {
    return NextResponse.redirect(new URL(redirUrls[role], request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
};

export const config = {
  matcher: ['/admin', '/users', '/users/:path*', '/', '/signup', '/api/:path*'],
};
