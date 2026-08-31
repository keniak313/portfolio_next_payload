import { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
    },
  ],
}
