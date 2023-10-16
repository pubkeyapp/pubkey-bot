import { useRoutes } from 'react-router-dom'
import { WebBotDetailFeature } from './web-bot-detail.feature'

export default function WebBotRoutes() {
  return useRoutes([
    //
    { path: ':botId/*', element: <WebBotDetailFeature /> },
  ])
}
