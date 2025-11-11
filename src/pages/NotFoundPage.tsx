import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

export default function NotFoundPage() {
  return (
    <Box textAlign="center" py={16}>
      <Heading size="lg" mb={2}>404</Heading>
      <Text color="gray.500" mb={6}>Страница не найдена</Text>
      <Button as={Link} to={PATHS.dashboard}>На главную</Button>
    </Box>
  )
}