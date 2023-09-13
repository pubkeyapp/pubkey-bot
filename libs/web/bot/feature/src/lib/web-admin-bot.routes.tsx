import { useRoutes } from 'react-router-dom'
import { WebAdminBotDetailFeature } from './web-admin-bot-detail.feature'
import { WebAdminBotCreateFeature } from './web-admin-bot-create.feature'
import { WebAdminBotListFeature } from './web-admin-bot-list.feature'

export default function WebAdminBotRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminBotListFeature /> },
    {
      path: 'create',
      element: <WebAdminBotCreateFeature />,
    },
    { path: ':botId/*', element: <WebAdminBotDetailFeature /> },
  ])
}
