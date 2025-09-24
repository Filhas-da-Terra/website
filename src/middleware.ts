import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/admin/:path*',
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const authToken = req.cookies.get('filhasdaterra-auth')?.value

  if (authToken === adminPassword) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin/login', req.url))
}
