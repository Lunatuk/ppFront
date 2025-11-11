// src/components/Sidebar.tsx (пример)
import { VStack, Button, Icon, Text } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import { FiHome, FiSettings } from 'react-icons/fi'

export default function Sidebar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <VStack
      align="stretch"
      spacing={2}
      minW="200px"
      py={2}
      display={{ base: 'none', md: 'flex' }} // скрываем на мобильных
    >
      <Button
        as={RouterLink}
        to={PATHS.dashboard}
        variant={isActive(PATHS.dashboard) ? 'solid' : 'ghost'}
        colorScheme="blue"
        justifyContent="start"
        leftIcon={<Icon as={FiHome} />}
      >
        Дашборд
      </Button>

      <Button
        as={RouterLink}
        justifyContent="start"
        leftIcon={<Icon as={FiSettings} />}
      >
        Настройки
      </Button>
    </VStack>
  )
}