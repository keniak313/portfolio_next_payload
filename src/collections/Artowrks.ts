import { duplicateValidator, slugify } from '@/lib/helpers'
import { isOwnerOrAdmin } from '@/lib/payload'
import { CollectionConfig } from 'payload'

export const Artworks: CollectionConfig = {
  slug: 'artworks',
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
      validate: duplicateValidator('artworks'),
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
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      admin: {
        appearance: 'select',
        placeholder: 'Select a project',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      required: true,
      admin: {
        placeholder: 'Select a user',
      },
      access: {
        read: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'media',
    },
  ],
}
