export const PATHS = {
  root: '/',
  login: '/login',
  register: '/register', 
  dashboard: '/dashboard',
  repo: (id = ':id') => `/repo/${id}`
} as const