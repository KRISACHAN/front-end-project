import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import UserProfile from './components/UserProfile'
import PostList from './components/PostList'
import HybridComponent from './components/HybridComponent'
import ClientServerInteraction from './components/ClientServerInteraction'
import './styles.css'

/**
 * Server Components Demo
 * 模拟展示 React 19 中服务器组件的概念
 */
export default function ServerComponentDemo() {
  return (
    <div className="server-component-demo">
      <h1>Server Components Demo</h1>

      <div className="note">
        <p>
          注意：这是一个模拟演示。在实际项目中，服务器组件需要在支持 React Server Components
          的框架（如 Next.js）中使用。这里我们通过模拟来展示其概念。
        </p>
      </div>

      <section>
        <h2>1. 模拟服务器组件数据获取</h2>
        <ErrorBoundary fallback={<div>Error loading user data</div>}>
          <Suspense fallback={<div>Loading user profile...</div>}>
            <UserProfile userId="1" />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. 模拟服务器组件列表渲染</h2>
        <ErrorBoundary fallback={<div>Error loading posts</div>}>
          <Suspense fallback={<div>Loading posts...</div>}>
            <PostList />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 客户端与服务器组件交互</h2>
        <ClientServerInteraction />
      </section>

      <section>
        <h2>4. 混合渲染示例</h2>
        <ErrorBoundary fallback={<div>Error in hybrid rendering</div>}>
          <HybridComponent />
        </ErrorBoundary>
      </section>
    </div>
  )
}
