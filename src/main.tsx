import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { setupServiceWorker } from './app/serviceWorker'
import { setupTheme } from './app/theme'
import { ensureKatex } from './services/markdown/katex'
import './app/theme.css'
import './app/global.css'

ensureKatex()
setupTheme()
setupServiceWorker()

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
