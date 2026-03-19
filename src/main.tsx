import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { ConfigProvider } from './context/ConfigContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
