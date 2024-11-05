> This is a reproduciable code posted to show an issue in the code.
> This repository can be removed at anytime.


## Cookies are not immedietly set when setting them in middleware, and reading them in page

In my real application, I am trying to see if the user is logged in or not, if the user is logged in, I will show him a LOGOUT button. If he is not logged in, I want to show him a LOGIN button.

But I am getting a problem, that the cookie first time is being `undefined` when reading it, although it exists, the second time, it is there.

---

I made a reproducible example here:

I am trying to set a cookie in `middleware.ts` file, then I am trying to read it (for demo in this simple reproducible code) in one of the pages.

This is a nextjs15 project with app router. 

All with server components.

I am setting a cookie in middleware.ts, and I am making sure the cookie is ALWAYS set and there. Then In a page, In a nested server component, I am trying to read that cookie once again. But, I am getting `undefined`!

I open my browser, open dev tools, navigated to the cookies section, then, request localhost:3000, (my application). a cookie gets in, but in the page, the cookie value isn't printed, I am getting (cookie is UNDEFINED). This only happens the first time, but if you refresh the page, subsequent requests will see the cookie value and it works.


Look at the demo here:

[![enter image description here][1]][1]


Folder:
```
.
├── bun.lockb
├── next.config.ts
├── next-env.d.ts
├── package.json
├── src
│   ├── app
│   │   ├── cookie-block.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── functions
│   │   └── auth-cookie.ts
│   └── middleware.ts
└── tsconfig.json
```


## File: src/middleware.ts
```typescript
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

```

## File: src/functions/auth-cookie.ts
```typescript
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

```

## File: src/app/page.tsx
```jsx
import { CookieBlock } from './cookie-block'

export default function Home() {
  return (
    <div className="bg-orange-400 flex justify-center h-screen w-screen items-center flex-col gap-y-16">
      <h1 className="font-extrabold text-4xl">This page is just for demo</h1>
      <CookieBlock />
    </div>
  )
}

```

## File: src/app/cookie-block.tsx
```jsx
import { getAuthCookie } from '@/functions/auth-cookie'
export const CookieBlock = async () => {
  const authToken = await getAuthCookie()
  return (
    <div className="bg-orange-700 text-center rounded-xl p-5">
      <h3 className="text-2xl font-bold">Your cookie is:</h3>
      <h4>
        <i>{authToken ?? 'IT IS UNDEFINED'}</i>
      </h4>
    </div>
  )
}

```


  [1]: https://i.sstatic.net/wsR7AnY8.gif