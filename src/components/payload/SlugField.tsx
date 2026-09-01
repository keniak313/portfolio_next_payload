'use client'

import { TextField, TextInput, useField, useFormFields } from '@payloadcms/ui'
import { TextFieldClientComponent } from 'payload'
import { useEffect, useRef } from 'react'

const slugify = (text: string) => {
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

export const SlugField: TextFieldClientComponent = (props) => {
  const { path, field } = props
  const { value: slugValue, setValue: setSlugValue } = useField({ path })
  const titleValue = useFormFields(([fields]) => fields?.title?.value)

  const isEditedManually = useRef(false)

  useEffect(() => {
    if (titleValue && !isEditedManually.current) {
      setSlugValue(slugify(titleValue))
    }
  }, [titleValue])

  return (
    <div className="field-type text">
      <label className="field-label">{(field.label as string) || 'Slug'}</label>
      <TextInput
        path={path}
        name={path}
        value={slugValue}
        disabled={true}
        onChange={(e) => {
          isEditedManually.current = true
          setSlugValue(slugify(e.target.value))
        }}
      />
    </div>
  )
}
