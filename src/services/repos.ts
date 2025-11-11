// src/services/repo.ts
import type { Repo, RepoDoc } from '@/types/repo'
import { apiGet } from './api'
import { getToken } from './auth'

export async function listRepos(): Promise<Repo[]> {
  const token = getToken()
  if (!token) return []

  try {
    return await apiGet<Repo[]>('/api/repos', token)
  } catch (err: any) {
    console.warn('Failed to load repos:', err.message)
    return []
  }
}

export async function getRepo(id: string): Promise<Repo | null> {
  const repos = await listRepos()
  return repos.find(r => r.id === id) ?? null
}

export async function getRepoDocs(repoId: string): Promise<RepoDoc | null> {
  const token = getToken()
  if (!token) return null

  try {
    return await apiGet<RepoDoc>(`/api/repos/${repoId}/docs`, token)
  } catch (err: any) {
    console.warn('Failed to load repo docs:', err.message)
    return null
  }
}