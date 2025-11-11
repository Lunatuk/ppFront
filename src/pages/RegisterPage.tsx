import { useState } from 'react'
import {
  Box, Button, Card, CardBody, FormControl, FormLabel,
  Heading, Input, Stack, Text, useToast
} from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'
import { register as apiRegister, login as apiLogin } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

export default function RegisterPage() {
  const toast = useToast()
  const { login: loginContext } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({ title: 'Ошибка', description: 'Пароли не совпадают', status: 'error' })
      return
    }

    try {
      setLoading(true)

      await apiRegister(email, password, confirmPassword)
      const user = await apiLogin(email, password)
      loginContext(user)

      toast({ title: 'Регистрация прошла успешно!', status: 'success' })
      navigate(PATHS.dashboard, { replace: true })
    } catch (e: any) {
      toast({
        title: 'Ошибка регистрации',
        description: e?.message ?? 'Попробуйте снова',
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
          <Heading size="md" mb={6}>Регистрация</Heading>
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
              <FormControl isRequired>
                <FormLabel>Повторите пароль</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" isLoading={loading}>
                Зарегистрироваться
              </Button>
              <Text color="gray.500" fontSize="sm">
                После регистрации вы будете автоматически залогинены.
              </Text>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}