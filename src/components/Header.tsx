import { getPayload } from '@/lib/payload'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'

export default async function Header() {
  const payload = await getPayload()
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return (
    <nav className="flex w-full items-center justify-center bg-amber-300 gap-2">
      <Link href="/">HOME</Link>
      <Link href={`/${user?.username}`}>{user?.username}</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  )
}
