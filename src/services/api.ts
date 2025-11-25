// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

type RequestOpts = {
  method: 'GET' | 'POST'
  token?: string | null
  body?: any
  baseUrl?: string
}

async function request<T>(url: string, opts: RequestOpts): Promise<T> {
  const res = await fetch(`${opts.baseUrl || API_BASE}${url}`, {
    method: opts.method,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    ...(opts.body ? { body: JSON.stringify(opts.body) } : {}),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

export async function apiGet<T>(url: string, token?: string | null, baseUrl?: string): Promise<T> {
  return request<T>(url, { method: 'GET', token, baseUrl })
}

export async function apiPost<T>(url: string, body: any, token?: string | null, baseUrl?: string): Promise<T> {
  return request<T>(url, { method: 'POST', body, token, baseUrl })
}
