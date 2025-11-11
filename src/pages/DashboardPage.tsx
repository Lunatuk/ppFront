// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { Box, SimpleGrid, Heading, Text, Center, Spinner } from '@chakra-ui/react'
import RepoCard from '@/components/RepoCard'
import EmptyState from '@/components/EmptyState'
import * as repos from '@/services/repos'
import type { Repo } from '@/types/repo'

type State =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Repo[] }

export default function DashboardPage() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    repos
      .listRepos()
      .then((data) => {
        if (cancelled) return
        if (data.length === 0) {
          setState({ status: 'empty' })
        } else {
          setState({ status: 'success', data })
        }
      })
      .catch((err) => {
        if (cancelled) return
        setState({ status: 'error', message: err.message || 'Не удалось загрузить репозитории' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box>
      <Heading size="lg" mb={4}>Мои репозитории</Heading>

      {state.status === 'loading' && (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      )}

      {state.status === 'empty' && (
        <EmptyState
          title="Репозитории не найдены"
          desc="Подключите GitHub, GitLab или локальную папку в настройках"
        />
      )}

      {state.status === 'error' && (
        <Center py={10}>
          <Text color="red.500" fontWeight="medium">
            {state.message}
          </Text>
        </Center>
      )}

      {state.status === 'success' && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {state.data.map((r) => (
            <RepoCard key={r.id} repo={r} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}