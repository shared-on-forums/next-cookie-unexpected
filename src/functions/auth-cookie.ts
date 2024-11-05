import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'auth'

export const setAuthCookie = (res: NextResponse) => {
  const hardcodedValue = 'abcd123'
  res.cookies.set(COOKIE_NAME, hardcodedValue, {})
  return res
}
export const getAuthCookie = async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value
}
