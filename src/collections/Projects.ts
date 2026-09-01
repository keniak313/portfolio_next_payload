import { duplicateValidator, slugify } from '@/lib/helpers'
import { isOwnerOrAdmin } from '@/lib/payload'
import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    update: (args) => isOwnerOrAdmin(args),
    create: (args) => isOwnerOrAdmin(args),
    delete: (args) => isOwnerOrAdmin(args),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      validate: duplicateValidator('projects'),
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          async ({ data, req }) => {
            if (!data?.title) return
            return slugify(data.title)
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
    },
    { name: 'artworks', type: 'join', collection: 'artworks', on: 'project', maxDepth: 5 },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      required: true,
      access: {
        read: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
