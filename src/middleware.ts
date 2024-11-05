import { NextResponse } from 'next/server'
import { getAuthCookie, setAuthCookie } from './functions/auth-cookie'

export default async function middleware() {
  // # ensure cookie exists
  const res = NextResponse.next()
  const authToken = await getAuthCookie()
  if (!authToken) setAuthCookie(res)
  return res
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
}
