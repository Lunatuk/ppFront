import { apiPost } from './api'
import { getToken } from './auth'

export async function sendMessage(message: string): Promise<string> {
  const token = getToken()
  if (!token) {
    throw new Error('Необходимо войти')
  }

  const res = await apiPost<{ reply: string }>('/api/ai/chat', { message }, token)
  return res.reply
}
