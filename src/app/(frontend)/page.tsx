import { getPayload } from '@/lib/payload'
import { Media } from '@/payload-types'
import Image from 'next/image'

export default async function HomePage() {
  const payload = await getPayload()

  const { docs: users } = await payload.find({
    collection: 'users',
  })

  return (
    <div>
      {users.map((user) => {
        const thumbnail = user.thumbnail as Media
        return (
          <div key={user.id}>
            {thumbnail?.url && (
              <a href={`/${user.username}`}>
                <Image src={thumbnail?.url} alt={user.username} width={200} height={200} />
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
