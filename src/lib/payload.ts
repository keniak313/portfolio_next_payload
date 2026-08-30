import config from '@/payload.config'
import { getPayload as getPayloadCMS } from 'payload'

export const getPayload = async () => {
  return await getPayloadCMS({ config })
}
