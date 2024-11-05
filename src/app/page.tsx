import { CookieBlock } from './cookie-block'

export default function Home() {
  return (
    <div className="bg-orange-400 flex justify-center h-screen w-screen items-center flex-col gap-y-16">
      <h1 className="font-extrabold text-4xl">This page is just for demo</h1>
      <CookieBlock />
    </div>
  )
}
