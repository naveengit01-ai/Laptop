import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Details from './components/Details'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Details />
  </StrictMode>,
)
