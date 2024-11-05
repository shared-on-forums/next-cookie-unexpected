import { NextResponse } from 'next/server'
import { getAuthCookie, setAuthCookie } from './functions/auth-cookie'

export default async function middleware() {
  // # ensure cookie exists
  const authToken = await getAuthCookie()
  if (!authToken) await setAuthCookie()
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
}
