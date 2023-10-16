import { lazy } from 'react'

export const WebAdminBotRoutes = lazy(() => import('./lib/web-admin-bot.routes'))
export const WebBotRoutes = lazy(() => import('./lib/web-bot.routes'))
