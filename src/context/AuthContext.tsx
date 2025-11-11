// src/context/AuthContext.tsx
import { createContext, useContext, useMemo, useState } from 'react'
import type { User } from '@/types/auth'
import * as authService from '@/services/auth'

const LS_KEY = 'aidocs_user'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  register: (email: string, password: string, confirmPassword: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Синхронная функция для чтения пользователя
function getInitialUser(): User | null {
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) return null
  try {
    const user = JSON.parse(raw) as User
    return user?.token ? user : null
  } catch {
    localStorage.removeItem(LS_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Читаем синхронно при старте
  const [user, setUser] = useState<User | null>(getInitialUser())

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user?.token,
      login: (user: User) => {
        localStorage.setItem(LS_KEY, JSON.stringify(user))
        setUser(user)
      },
      register: async (email, password, confirmPassword) => {
        await authService.register(email, password, confirmPassword)
        const loggedInUser = await authService.login(email, password)
        localStorage.setItem(LS_KEY, JSON.stringify(loggedInUser))
        setUser(loggedInUser)
      },
      logout: () => {
        authService.logout()
        setUser(null)
      },
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}