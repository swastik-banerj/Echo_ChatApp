import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  // Always allow NextAuth and homepage
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Protect certain routes
  if (!token && (pathname.startsWith('/users') || pathname.startsWith('/chat'))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

// Runs only for these paths
export const config = {
  matcher: ['/users/:path*', '/chat/:path*'],
}

