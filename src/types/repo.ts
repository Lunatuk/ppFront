export type Repo = {
  id: string
  name: string
  description?: string
  languages: string[]
  lastUpdated: string
  docsStatus: 'fresh' | 'outdated' | 'missing'
}

export type RepoDoc = {
  repoId: string
  readme: string
  apiDocs: string
  umlMermaid: string
}