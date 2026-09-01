import { isOwnerOrAdmin } from '@/lib/payload'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (args) => isOwnerOrAdmin(args),
    update: (args) => isOwnerOrAdmin(args),
    create: (args) => isOwnerOrAdmin(args),
    delete: (args) => isOwnerOrAdmin(args),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // Jeśli użytkownik wpisał coś ręcznie, zostawiamy to
            if (value) return value

            // Jeśli wgrywamy plik i pole ALT jest puste:
            if (data?.filename) {
              // Pobieramy nazwę pliku, usuwamy rozszerzenie i zamieniamy myślniki/podkreślenia na spacje
              const nameWithoutExtension =
                data.filename.substring(0, data.filename.lastIndexOf('.')) || data.filename
              const cleanAlt = nameWithoutExtension.replace(/[-_]/g, ' ')

              // Zwracamy ładną nazwę (np. "zdjecie z wakacji")
              return cleanAlt
            }

            return value
          },
        ],
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      access: {
        read: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
  upload: true,
}
