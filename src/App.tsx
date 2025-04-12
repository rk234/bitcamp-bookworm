import { Route, Routes } from 'react-router'
import './App.css'
import MarkdownRenderer from './components/MarkdownRenderer'

function App() {
  const md = `# Header\n\nSome text\n\n**Yay math**: $\\frac{1}{x}$
`
  return (
    <Routes>
      <Route index element={<MarkdownRenderer md={md}></MarkdownRenderer>}></Route>
      <Route path="/world" element={<p>world</p>}></Route>
    </Routes>
  )
}

export default App
