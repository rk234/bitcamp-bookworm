import { Route, Routes } from 'react-router'
import './App.css'
import MarkdownRenderer from './components/MarkdownRenderer'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import NetworkPage from './pages/NetworkPage'

function App() {
  const md = `# Header\n\nSome text\n\n**Yay math**: $\\frac{1}{x}$
`
  return (
    <Routes>
      <Route index element={<LandingPage/>}></Route>
      <Route path="/edit" element={<EditorPage/>}></Route>
      <Route path="/network" element={<NetworkPage/>}></Route>
    </Routes>
  )
}

export default App
