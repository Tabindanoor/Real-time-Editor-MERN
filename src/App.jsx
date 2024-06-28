import { BrowserRouter  } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <div>
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    duration: 2000,
    style: {
      background: '#363636',
      color: '#fff',
    },

  
  }}
/> 
    </div>

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
