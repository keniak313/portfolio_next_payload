import { getPayload } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayload()

  const { docs: users } = await payload.find({
    collection: 'users',
  })

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}
