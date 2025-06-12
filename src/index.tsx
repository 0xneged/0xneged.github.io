import 'index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import App from 'App'
import queryClient from 'helpers/queryClient'
import { config } from 'helpers/wagmiConnector'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { WagmiProvider } from 'wagmi'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'

dayjs.extend(objectSupport)
dayjs.extend(utc)
dayjs.extend(duration)

createRoot(document.getElementById('root') as Element).render(
  <HashRouter>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </HashRouter>
)
