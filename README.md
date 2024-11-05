> This is a reproduciable code posted to show an issue in the code.
> This repository can be removed at anytime.


this branch shows solving the problem by not using the `cookie` function from `next/headers` package.
By relying only on `NextResponse.next().cookies.set(...)`


I used this directly instead and it worked
```ts
// # middleware.ts
export default async function middleware() {
  // # ensure cookie exists
  const res = NextResponse.next()
  const authToken = await getAuthCookie()
  if (!authToken) setAuthCookie(res) // 👈 pass the res, no need for async/await

  return res // 👈 return the res
}
```
```ts
// # auth-cookie.ts
const COOKIE_NAME = 'auth'

export const setAuthCookie = (res: NextResponse) => {
  const hardcodedValue = 'abcd123'
  return res.cookies.set(COOKIE_NAME, hardcodedValue, {})
}
```
