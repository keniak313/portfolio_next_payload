import config from '@/payload.config'
import { Access, getPayload as getPayloadCMS } from 'payload'

export const getPayload = async () => {
  return await getPayloadCMS({ config })
}

export const isOwnerOrAdmin: Access = ({ req: { user } }) => {
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
