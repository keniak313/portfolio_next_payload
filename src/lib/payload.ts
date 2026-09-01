import config from '@/payload.config'
import { Access, getPayload as getPayloadCMS } from 'payload'

export const getPayload = async () => {
  return await getPayloadCMS({ config })
}

export const isOwnerOrAdmin: Access = ({ req: { user } }) => {
  console.log('DEBUG ACCESS:', {
    userId: user?.id,
    role: user?.role,
    env: process.env.NODE_ENV,
  })

  if (user?.role === 'admin') return true
  if (user) {
    return {
      user: {
        equals: user.id,
      },
    }
  }
  return false
}
