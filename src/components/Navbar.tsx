// src/components/Navbar.tsx
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import AIChatButton from './AIChatButton'

export default function Navbar() {
  const { user, logout } = useAuth()

  const username = user?.email.split('@')[0] || 'User'

  return (
    <Box bg="blue.600" color="white" py={3} px={4}>
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Text fontWeight="bold" fontSize="lg">
          AI Docs
        </Text>

        <Flex align="center" gap={4}>
          <AIChatButton />
          <Text fontSize="sm"><strong>{username}</strong></Text>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={logout}
            as={RouterLink}
            to={PATHS.login}
          >
            Выйти
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
