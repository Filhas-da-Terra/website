import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('filhasdaterra-auth', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    return new NextResponse('OK', { status: 200 })
  }

  return new NextResponse('Unauthorized', { status: 401 })
}
