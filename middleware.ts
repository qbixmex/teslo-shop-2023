import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!session) {
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `page=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/address',
    '/checkout/summary'
  ],
};
