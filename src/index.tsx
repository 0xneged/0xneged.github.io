import 'index.css'

import App from 'App'
import { config } from 'helpers/wagmiConnector'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from 'helpers/queryClient'

createRoot(document.getElementById('root') as Element).render(
  <HashRouter>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </HashRouter>
)
