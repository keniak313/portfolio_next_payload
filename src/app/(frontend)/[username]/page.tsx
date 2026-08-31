import { getPayload } from '@/lib/payload'
import { Artwork, Media, Project } from '@/payload-types'
import Image from 'next/image'

type PageProps = {
  params: Promise<{ username: string }>
}

export default async function UserPage({ params }: PageProps) {
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
      <div>
        {user.projects?.docs?.map((p) => {
          const project = p as Project
          return (
            <div key={project.id}>
              <p>{project.title}</p>
              {project.artworks?.docs?.map((a) => {
                const artwork = a as Artwork
                const thumbnail = artwork.thumbnail as Media
                return (
                  <div key={artwork.id}>
                    {thumbnail?.url && (
                      <Image
                        src={thumbnail?.url}
                        width={250}
                        height={250}
                        alt={artwork.title}
                        loading="eager"
                      />
                    )}
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
