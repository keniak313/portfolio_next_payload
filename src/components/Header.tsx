import { getPayload } from '@/lib/payload'
import { headers as getHeaders } from 'next/headers.js'

export default async function Header() {
  const payload = await getPayload()
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return (
    <nav className="flex w-full items-center justify-center bg-amber-300">
      Logged in as: {user?.email}
    </nav>
  )
}
