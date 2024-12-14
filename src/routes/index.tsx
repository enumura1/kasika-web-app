// src/routes/index.tsx
import { 
    createRootRoute,
    createRoute, 
    createRouter
  } from '@tanstack/react-router'
  import { HomePage } from '../pages/HomePage';
  import { UsagePage } from '../pages/UsagePage'
  import { SupportPage } from '../pages/SupportPage'; 
  import { EditorPage } from '../pages/EditorPage';

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

  const supportRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/support',
    component: SupportPage
  });

  const generatedEditorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/editor/generated',  // パスを修正
    validateSearch: (search: Record<string, unknown>) => ({
      svg: search.svg as string | undefined,
    }),
    component: EditorPage
  });

    // エディターページのルートを追加（無料プラン用）
    const editorRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/editor/$templateId',
      component: EditorPage
    });

  // ルートツリーの作成
  const routeTree = rootRoute.addChildren([
    indexRoute,
    supportRoute,
    usageRoute,
    editorRoute,
    generatedEditorRoute
  ])
  
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