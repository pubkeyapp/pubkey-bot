import { WebAuthLoginFeature, WebAuthRegisterFeature } from '@pubkey-bot/web/auth/feature'
import { WebBotRoutes } from '@pubkey-bot/web/bot/feature'
import { WebDashboardRoutes } from '@pubkey-bot/web/dashboard/feature'
import { WebHomeRoutes } from '@pubkey-bot/web/home/feature'
import { WebProfileRoutes } from '@pubkey-bot/web/profile/feature'
import { WebSettingsRoutes } from '@pubkey-bot/web/settings/feature'
import { UiNotFound } from '@pubkey-bot/web/ui/core'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const LazyAdminFeature = lazy(() => import('./web-admin.routes'))

export function WebShellRoutes() {
  return useGuardedRoutes({
    index: '/dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '/bot/*', element: <WebBotRoutes /> },
      { path: '/dashboard', element: <WebDashboardRoutes /> },
      { path: '/profile/*', element: <WebProfileRoutes /> },
      { path: '/settings/*', element: <WebSettingsRoutes /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
    ],
    root: [
      // Routes for the auth feature
      { path: '/login', element: <WebAuthLoginFeature /> },
      { path: '/register', element: <WebAuthRegisterFeature /> },
      // Homepage
      { path: '/*', element: <WebHomeRoutes /> },
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
