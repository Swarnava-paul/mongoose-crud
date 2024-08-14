import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './app/reduxStore/store.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <Provider store={Store}>
      <App />
      </Provider>
    </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)