import { TextFieldValidation } from 'payload'

export const slugify = (text: string) => {
  if (!text) return ''

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ł/g, 'l') // Specjalne traktowanie dla 'ł'
    .replace(/ł/g, 'l') // (zabezpieczenie globalne)
    .normalize('NFD') // Rozbija znaki diakrytyczne np. ą -> a + ˛
    .replace(/[\u0300-\u036f]/g, '') // Usuwa oddzielone ogonki/akcenty
    .replace(/\s+/g, '-') // Zamienia spacje na myślniki
    .replace(/[^\w\-]+/g, '') // Usuwa wszystkie inne znaki specjalne
    .replace(/\-\-+/g, '-') // Usuwa podwójne myślniki
    .replace(/^-+/, '') // Usuwa myślniki z początku
    .replace(/-+$/, '') // Usuwa myślniki z końca
}

export const duplicateValidator = (collection: string) => {
  return async (value, { req, operation, id }) => {
    const curUserId = req.user?.id
    if (!curUserId) return 'You must be logged in to create a project'

    if (!value) return 'Title is required'

    const originalValue = value.toString().trim()
    const lowerValue = originalValue.toLowerCase()

    if (lowerValue.length < 3) return 'Title must be at least 3 characters long'

    if (lowerValue.length > 100) return 'Title must be at most 100 characters long'

    if (!lowerValue.match(/^[a-zA-Z0-9 :]+$/))
      return 'Title must contain only letters, numbers, spaces and hyphens and colons'

    const duplicateMatch = await req.payload.find({
      collection: collection,
      where: {
        user: {
          equals: curUserId,
        },
        title: {
          equals: lowerValue,
        },
      },
      limit: 1,
    })

    console.log('DUPLICATE', duplicateMatch)

    if (operation === 'update' && duplicateMatch.docs[0]?.id === id) {
      return true
    }

    if (duplicateMatch.docs.length > 0) {
      return 'Title already exists'
    }

    return true
  }
}
