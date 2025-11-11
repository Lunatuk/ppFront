import { Badge } from '@chakra-ui/react'

const colors: Record<string, string> = {
  TypeScript: 'blue',
  JavaScript: 'yellow',
  Python: 'green',
  Java: 'red'
}

export default function LanguageBadge({ lang }: { lang: string }) {
  const colorScheme = (colors[lang] ?? 'gray') as any
  return <Badge colorScheme={colorScheme} mr={2}>{lang}</Badge>
}