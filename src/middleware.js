import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Permitir acesso livre à página /unauthorized para evitar loop
  if (pathname === '/unauthorized') {
    return NextResponse.next();
  }

  const protectedPaths = ['/registerProduct', '/products'];

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/registerProduct', '/products'],
};