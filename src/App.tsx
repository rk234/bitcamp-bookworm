import { Route, Routes } from 'react-router'
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<p>Hello</p>}></Route>
      <Route path="/world" element={<p>world</p>}></Route>
    </Routes>
  )
}

export default App
