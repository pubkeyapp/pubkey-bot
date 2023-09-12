import { WebAuthProvider } from '@pubkey-bot/web/auth/data-access'
import { WebSdkProvider } from '@pubkey-bot/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-bot/web/ui/core'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        showNotificationError(`Something went wrong`, { title: 'Error' })
      },
    },
  },
})

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <WebSdkProvider>
          <WebAuthProvider>
            <UiThemeProvider>
              <WebShellRoutes />
            </UiThemeProvider>
          </WebAuthProvider>
        </WebSdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
