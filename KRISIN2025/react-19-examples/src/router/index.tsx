import { createBrowserRouter, RouterProvider } from 'react-router'
import { lazy, Suspense } from 'react'

const Layout = lazy(() => import('../layouts'))
const Home = lazy(() => import('../pages/home'))
const CompilerDemo = lazy(() => import('../pages/compiler-demo'))
const ServerComponentDemo = lazy(() => import('../pages/server-component-demo'))
const ActionsDemo = lazy(() => import('../pages/actions-demo'))
const FormDemo = lazy(() => import('../pages/form-demo'))
const OptimisticDemo = lazy(() => import('../pages/optimistic-demo'))
const DocumentMetadataDemo = lazy(() => import('../pages/document-metadata-demo'))
const AssetLoadingDemo = lazy(() => import('../pages/asset-loading-demo'))
const WebComponentDemo = lazy(() => import('../pages/web-component-demo'))
const UseHookDemo = lazy(() => import('../pages/use-hook-demo'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'compiler',
        element: <CompilerDemo />,
      },
      {
        path: 'server-component',
        element: <ServerComponentDemo />,
      },
      {
        path: 'actions',
        element: <ActionsDemo />,
      },
      {
        path: 'form',
        element: <FormDemo />,
      },
      {
        path: 'optimistic',
        element: <OptimisticDemo />,
      },
      {
        path: 'document-metadata',
        element: <DocumentMetadataDemo />,
      },
      {
        path: 'asset-loading',
        element: <AssetLoadingDemo />,
      },
      {
        path: 'web-component',
        element: <WebComponentDemo />,
      },
      {
        path: 'use-hook',
        element: <UseHookDemo />,
      },
    ],
  },
])

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
