import { useRoutes } from 'react-router-dom'
import { WebAdminConnectionDetailFeature } from './web-admin-connection-detail.feature'
import { WebAdminConnectionCreateFeature } from './web-admin-connection-create.feature'
import { WebAdminConnectionListFeature } from './web-admin-connection-list.feature'

export default function WebAdminConnectionRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminConnectionListFeature /> },
    {
      path: 'create',
      element: <WebAdminConnectionCreateFeature />,
    },
    { path: ':connectionId/*', element: <WebAdminConnectionDetailFeature /> },
  ])
}
