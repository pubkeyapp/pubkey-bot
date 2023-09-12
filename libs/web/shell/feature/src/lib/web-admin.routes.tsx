import { WebDevAdminRoutes } from '@pubkey-bot/web/dev/feature'
import { UiContainer, UiDashboard, UiNotFound } from '@pubkey-bot/web/ui/core'
import { WebAdminUserRoutes } from '@pubkey-bot/web/user/feature'
import { IconBug, IconUsers } from '@tabler/icons-react'
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
              { label: 'Development', icon: IconBug, link: '/admin/development' },
              { label: 'Users', icon: IconUsers, link: '/admin/users' },
              // GENERATE_ADMIN_DASHBOARD_LINK
            ]}
          />
        </UiContainer>
      ),
    },
    { path: 'development/*', element: <WebDevAdminRoutes /> },
    { path: 'users/*', element: <WebAdminUserRoutes /> },
    // GENERATE_ADMIN_DASHBOARD_ROUTE
    { path: '*', element: <UiNotFound /> },
  ])
}
