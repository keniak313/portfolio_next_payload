import { duplicateValidator } from '@/lib/helpers'
import { isOwnerOrAdmin } from '@/lib/payload'
import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Companies: CollectionConfig = {
  slug: 'companies',
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
      validate: duplicateValidator('companies'),
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
    { name: 'location', type: 'text' },
    { name: 'role', type: 'text' },
    {
      name: 'timeRange',
      type: 'group',
      fields: [
        { name: 'isPresent', type: 'checkbox', defaultValue: false },
        {
          name: 'startDate',
          type: 'date',
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            condition: (data) => {
              console.log('data is', data.timeRange?.isPresent)
              return !data.timeRange?.isPresent
            },
          },
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'projects',
      type: 'join',
      collection: 'projects',
      on: 'company',
    },
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
