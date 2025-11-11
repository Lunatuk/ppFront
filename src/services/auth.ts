// src/services/auth.ts
import { User } from '@/types/auth'
import { apiPost } from './api'

const LS_KEY = 'aidocs_user'

export async function login(email: string, password: string): Promise<User> {
  const res = await apiPost<{ token: string }>('/login', { email, password })
  const user: User = {
    id: crypto.randomUUID(),
    email,
    token: res.token
  }
  localStorage.setItem(LS_KEY, JSON.stringify(user))
  return user
}

export async function register(email: string, password: string, confirmPassword: string) {
  return apiPost('/register', { email, password, confirm_password: confirmPassword })
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getToken(): string | null {
  const user = getCurrentUser()
  return user?.token ?? null
}

export function logout() {
  localStorage.removeItem(LS_KEY)
}