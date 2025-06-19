import 'index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import App from 'components/App'
import queryClient from 'helpers/queryClient'
import { config } from 'helpers/wagmiConnector'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { WagmiProvider } from 'wagmi'

import { MiniAppProvider } from '@neynar/react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'

dayjs.extend(objectSupport)
dayjs.extend(utc)
dayjs.extend(duration)

createRoot(document.getElementById('root') as Element).render(
  <BrowserRouter>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MiniAppProvider>
          <App />
        </MiniAppProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </BrowserRouter>
)
