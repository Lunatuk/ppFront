import { Box, Container, Flex } from '@chakra-ui/react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { PATHS } from './routes/paths'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RepoPage from './pages/RepoPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './routes/ProtectedRoute'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  const loc = useLocation()
  const isAuthPage = loc.pathname === PATHS.login || loc.pathname === PATHS.register

  return (
    <Box>
      {!isAuthPage && <Navbar />}
      <Container maxW="7xl">
        <Flex gap={4} align="start">
          {!isAuthPage && <Sidebar />}
          <Box flex="1" py={2}>
          <Routes>
            <Route path={PATHS.login} element={<LoginPage />} />
            <Route path={PATHS.register} element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to={PATHS.dashboard} replace />} />
              <Route path={PATHS.dashboard} element={<DashboardPage />} />
              <Route path={PATHS.repo()} element={<RepoPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}