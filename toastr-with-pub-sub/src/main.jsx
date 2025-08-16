import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToastrContainer from './components/ToastrContainer.jsx'

createRoot(document.getElementById('root')).render(
  <ToastrContainer>
    <App />
  </ToastrContainer>
)
