import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token') ?? '';
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_SEED ?? '')
    );
    return NextResponse.next();
  } catch (error) {
    const { protocol, host, pathname } = request.nextUrl;
    return NextResponse.redirect(
      `${protocol}//${host}/auth/login?page=${pathname}`
    );
  }
};

export const config = {
  matcher: [
    '/checkout/address',
    '/checkout/summary'
  ],
};
