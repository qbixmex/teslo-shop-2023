import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const session: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const validRoles = ['admin', 'super-user', 'seo'];

  if (!session) {
    if (request.nextUrl.pathname.startsWith('/api/admin/orders')) {
      return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      return new NextResponse(JSON.stringify({ message: 'Not Authorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });
    }

    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `page=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  if (
    request.nextUrl.pathname.startsWith('/api/admin') &&
    !validRoles.includes(session.user.role)
  ) {
    return new NextResponse(JSON.stringify({ message: 'Not Authorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !validRoles.includes(session.user.role)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
