import 'index.css'

import App from 'App'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root') as Element).render(
  <HashRouter>
    <App />
  </HashRouter>
)
