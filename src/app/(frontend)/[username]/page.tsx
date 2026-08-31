import { getPayload } from '@/lib/payload'
import { Project } from '@/payload-types'

export default async function UserPage({ params }) {
  const { username } = await params
  const payload = await getPayload()
  console.log(username)

  const data = await payload.find({
    collection: 'users',
    where: {
      username: { equals: username },
    },
    depth: 4,
  })

  const user = data.docs[0]

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>{username}</h1>
      {console.log(user)}
      <div>
        {user.projects?.docs?.map((p) => {
          const project = p as Project
          return <p key={project.id}>{project.title}</p>
        })}
      </div>
    </div>
  )
}
