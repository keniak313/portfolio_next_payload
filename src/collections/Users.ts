import { isOwnerOrAdmin } from '@/lib/payload'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden(args) {
      return args.user?.role !== 'admin'
    },
  },
  access: {
    read: () => true,
    // create: ({ req }) => req.user?.role === 'admin',
    // delete: ({ req }) => req.user?.role === 'admin',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'username',
      type: 'text',
      unique: true,
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value) {
          return 'Username is required'
        }
        if (value.length < 3) {
          return 'Username must be at least 3 characters long'
        }
        if (value.length > 30) {
          return 'Username must be at most 30 characters long'
        }
        if (!value.match(/^[a-z0-9-_]+$/)) {
          return 'Username must contain only small letters, numbers, underscores and hyphens'
        }
        return true
      },
    },
    {
      name: 'role',
      type: 'select',
      access: {
        read: ({ req }) => req.user?.role === 'admin',
      },
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortBio',
      type: 'text',
    },
    { name: 'about', type: 'richText' },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'text',
        },
      ],
    },
    {
      name: 'projects',
      type: 'join',
      collection: 'projects',
      on: 'user',
      maxDepth: 5,
    },
  ],
}
