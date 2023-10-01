import { WebAdminBotRoutes } from '@pubkey-bot/web/bot/feature'
import { WebAdminCollectionRoutes } from '@pubkey-bot/web/collection/feature'
import { WebDevAdminRoutes } from '@pubkey-bot/web/dev/feature'
import { WebAdminNetworkRoutes } from '@pubkey-bot/web/network/feature'
import { UiContainer, UiDashboard, UiNotFound } from '@pubkey-bot/web/ui/core'
import { WebAdminUserRoutes } from '@pubkey-bot/web/user/feature'
import { IconBug, IconNetwork, IconRobot, IconStack2, IconUsers } from '@tabler/icons-react'
import { Navigate, useRoutes } from 'react-router-dom'

export default function WebAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboard
            links={[
              { label: 'Bots', icon: IconRobot, link: '/admin/bots' },
              { label: 'Collections', icon: IconStack2, link: '/admin/collections' },
              { label: 'Development', icon: IconBug, link: '/admin/development' },
              { label: 'Networks', icon: IconNetwork, link: '/admin/networks' },
              { label: 'Users', icon: IconUsers, link: '/admin/users' },
              // GENERATE_ADMIN_DASHBOARD_LINK
            ]}
          />
        </UiContainer>
      ),
    },
    { path: 'bots/*', element: <WebAdminBotRoutes /> },
    { path: 'collections/*', element: <WebAdminCollectionRoutes /> },
    { path: 'development/*', element: <WebDevAdminRoutes /> },
    { path: 'networks/*', element: <WebAdminNetworkRoutes /> },
    { path: 'users/*', element: <WebAdminUserRoutes /> },
    // GENERATE_ADMIN_DASHBOARD_ROUTE
    { path: '*', element: <UiNotFound /> },
  ])
}
