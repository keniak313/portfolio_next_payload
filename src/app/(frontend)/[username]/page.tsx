import { getPayload } from '@/lib/payload'
import { Artwork, Project } from '@/payload-types'
import Image from 'next/image'

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

  if (!data) {
    return (
      <div>
        <p>LOADING...</p>
      </div>
    )
  }

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
          return (
            <div key={project.id}>
              <p>{project.title}</p>
              {project.artworks?.docs?.map((a) => {
                const artwork = a as Artwork
                return (
                  <div key={artwork.id}>
                    <Image
                      src={artwork.thumbnail.url}
                      width={250}
                      height={250}
                      alt={artwork.title}
                      loading="eager"
                    />
                    {artwork.title}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
