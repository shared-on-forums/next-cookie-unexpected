import { cookies } from 'next/headers'

const COOKIE_NAME = 'auth'

export const setAuthCookie = async () => {
  const cookieStore = await cookies()
  const hardcodedValue = 'abcd123'
  cookieStore.set(COOKIE_NAME, hardcodedValue, {})
}
export const getAuthCookie = async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value
}
