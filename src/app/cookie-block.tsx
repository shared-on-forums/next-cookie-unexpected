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
