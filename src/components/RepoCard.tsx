import { Card, CardBody, Heading, Text, HStack, Badge, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import LanguageBadge from './LanguageBadge'
import { CheckCircleIcon, WarningIcon, SmallCloseIcon } from '@chakra-ui/icons'
import type { Repo } from '@/types/repo'

export default function RepoCard({ repo }: { repo: Repo }) {
  const statusIcon = {
    fresh: <Icon as={CheckCircleIcon} color="green.400" />,
    outdated: <Icon as={WarningIcon} color="orange.400" />,
    missing: <Icon as={SmallCloseIcon} color="red.400" />
  }[repo.docsStatus]

  return (
    <Card as={Link} to={PATHS.repo(repo.id)} _hover={{ textDecoration: 'none', boxShadow: 'lg' }}>
      <CardBody>
        <HStack justify="space-between" mb={2}>
          <Heading size="md">{repo.name}</Heading>
          {statusIcon}
        </HStack>
        <Text color="gray.600" noOfLines={2} mb={3}>{repo.description}</Text>
        <HStack wrap="wrap">
          {repo.languages.map(l => <LanguageBadge key={l} lang={l} />)}
          <Badge ml="auto" colorScheme="purple">Обновлён: {new Date(repo.lastUpdated).toLocaleDateString()}</Badge>
        </HStack>
      </CardBody>
    </Card>
  )
}