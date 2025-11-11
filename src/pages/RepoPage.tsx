import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, HStack, Button } from '@chakra-ui/react'
import * as repoSvc from '@/services/repos'
import type { Repo, RepoDoc } from '@/types/repo'
import LanguageBadge from '@/components/LanguageBadge'
import DocViewer from '@/components/DocViewer'
import Loading from '@/components/Loading'

export default function RepoPage() {
  const { id = '' } = useParams()
  const [repo, setRepo] = useState<Repo | null>(null)
  const [docs, setDocs] = useState<RepoDoc | null>(null)

  useEffect(() => {
    repoSvc.getRepo(id).then(setRepo)
    repoSvc.getRepoDocs(id).then(setDocs)
  }, [id])

  if (!repo) return <Loading />

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Box>
          <Heading size="lg" mb={1}>{repo.name}</Heading>
          <Text color="gray.500">{repo.description}</Text>
          <HStack mt={2}>
            {repo.languages.map(l => <LanguageBadge key={l} lang={l} />)}
          </HStack>
        </Box>
        <Button colorScheme="blue" variant="outline" isDisabled>Запустить генерацию</Button>
      </HStack>

      {docs ? (
        <DocViewer readme={docs.readme} apiDocs={docs.apiDocs} umlMermaid={docs.umlMermaid} />
      ) : (
        <Text color="gray.500">Документация пока не сгенерирована.</Text>
      )}
    </Box>
  )
}