import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
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
      name: 'projects',
      type: 'join',
      collection: 'projects',
      on: 'user',
      maxDepth: 5,
    },
  ],
}
