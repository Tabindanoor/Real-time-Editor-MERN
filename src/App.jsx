import { BrowserRouter  } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/editor/:id" element={<EditorPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
