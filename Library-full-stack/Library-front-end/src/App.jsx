
import './App.css'
// context
import { AuthContextProvider } from './contexts/AuthContext'
// pages
import Login from './pages/Login'

// higher order functions
import AuthenticationCheck from './AuthenticationChech'

function App() {


  return (
    <>
    <AuthContextProvider>
      <AuthenticationCheck Login={Login}/>
    </AuthContextProvider>
    </>
  )
}

export default App
