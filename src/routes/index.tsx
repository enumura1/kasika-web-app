// src/routes/index.tsx
import { 
    createRootRoute,
    createRoute, 
    createRouter
  } from '@tanstack/react-router'
  import { HomePage } from '../pages/HomePage';
  import { UsagePage } from '../pages/UsagePage'
  
  // ルートの定義を最新の書き方に修正
  const rootRoute = createRootRoute()
  
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
  })
  
  const usageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/usage',
    component: UsagePage
  })
  
  // ルートツリーの作成
  const routeTree = rootRoute.addChildren([indexRoute, usageRoute])
  
  // ルーターの作成
  export const router = createRouter({
    routeTree,
    defaultPreload: 'intent'
  })
  
  // 型定義
  declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
  }