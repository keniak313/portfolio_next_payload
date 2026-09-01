import { getPayload } from '@/lib/payload'
import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 10

export default async function HomePage() {
  const payload = await getPayload()

  const { docs: users } = await payload.find({
    collection: 'users',
    overrideAccess: true,
    select: {
      username: true,
      thumbnail: true,
    },
  })

  return (
    <div>
      {users.map((user) => {
        const thumbnail = user.thumbnail as Media
        return (
          <div key={user.id}>
            {thumbnail?.url && (
              <Link href={`/${user.username}`}>
                <Image src={thumbnail?.url} alt={user.username} width={200} height={200} />
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
