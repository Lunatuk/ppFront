import { Box, Heading, Text } from '@chakra-ui/react'

export default function EmptyState({ title, desc }: { title: string; desc?: string }) {
  return (
    <Box p={6} textAlign="center">
      <Heading size="md" mb={2}>{title}</Heading>
      {desc && <Text color="gray.500">{desc}</Text>}
    </Box>
  )
}