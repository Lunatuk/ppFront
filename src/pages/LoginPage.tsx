import { useState } from 'react'
import {
  Box, Button, Card, CardBody, FormControl, FormLabel,
  Heading, Input, Stack, Text, useToast
} from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import { login as apiLogin } from '@/services/auth'

export default function LoginPage() {
  const toast = useToast()
  const { login: loginContext } = useAuth() // из контекста
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await apiLogin(email, password)
      loginContext(user) // сохраняем в контекст
      toast({ title: 'Добро пожаловать!', status: 'success' })
      navigate(PATHS.dashboard, { replace: true })
    } catch (e: any) {
      toast({
        title: 'Ошибка входа',
        description: e?.message || 'Попробуйте снова',
        status: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="70vh" display="grid" placeItems="center" px={4}>
      <Card w="full" maxW="md">
        <CardBody>
          <Heading size="md" mb={6}>Вход</Heading>
          <form onSubmit={onSubmit}>
            <Stack gap={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" isLoading={loading}>
                Войти
              </Button>

              <Text fontSize="sm">
                Нет аккаунта?{' '}
                <Button
                  as={RouterLink}
                  to={PATHS.register}
                  variant="link"
                  colorScheme="blue"
                  size="sm"
                  p={0}
                  height="auto"
                >
                  Зарегистрироваться
                </Button>
              </Text>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}