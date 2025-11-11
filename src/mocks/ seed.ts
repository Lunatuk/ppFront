import type { Repo, RepoDoc } from '../types/repo'  // <= без '@'

const FLAG = 'aidocs_seeded'
const LS_REPOS = 'aidocs_repos'
const LS_DOCS  = 'aidocs_docs'

function seedOnce() {
  if (typeof window === 'undefined') return           // подстраховка на случай SSR
  if (localStorage.getItem(FLAG) === '1') return

  const repos: Repo[] = [
    { id: 'r1', name: 'ai-docs-backend', description: 'Сервис парсинга и генерации документации', languages: ['Python','TypeScript'], lastUpdated: new Date().toISOString(), docsStatus: 'outdated' },
    { id: 'r2', name: 'ai-docs-frontend', description: 'Веб-интерфейс и просмотрщик документации', languages: ['TypeScript'], lastUpdated: new Date(Date.now()-86400000).toISOString(), docsStatus: 'fresh' },
  ]

  const docs: RepoDoc[] = [
    { repoId: 'r1', readme: '# ai-docs-backend\\n\\nСервис генерации docstring и README.', apiDocs: '## API\\n\\nGET /repos/:id/docs', umlMermaid: 'classDiagram\\n  class Parser\\n  class Generator\\n  Parser --> Generator' },
    { repoId: 'r2', readme: '# ai-docs-frontend\\n\\nReact + Chakra UI.', apiDocs: '## UI Contracts\\n\\nNo server yet.', umlMermaid: 'flowchart LR\\n  UI-->Services' },
  ]

  localStorage.setItem(LS_REPOS, JSON.stringify(repos))
  localStorage.setItem(LS_DOCS, JSON.stringify(docs))
  localStorage.setItem(FLAG, '1')
}

seedOnce()