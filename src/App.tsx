import { Route, Routes } from 'react-router'
import './App.css'
// import MarkdownRenderer from './components/MarkdownRenderer'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import NetworkPage from './pages/NetworkPage'
import LoginPage from './pages/LoginPage'
import RequireAuth from './components/auth/RequireAuth'
import AuthProvider from './providers/AuthProvider'
import useAuth from './hooks/useAuth'

function SecretPage() {
  const { user } = useAuth()

  return <p>Hello {user!.displayName}!</p>
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/login" element={
          <RequireAuth noAuth redirect={"/secret"}>
            <LoginPage />
          </RequireAuth>}
        ></Route>
        <Route path="/edit" element={<EditorPage />}></Route>
        <Route path="/secret" element={<RequireAuth>
          <SecretPage />
        </RequireAuth>}> </Route>
        <Route path="/network" element={<NetworkPage />}></Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
