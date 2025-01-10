import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import TodoList from './components/TodoList'
import ShoppingCart from './components/ShoppingCart'
import UserProfile from './components/UserProfile'
import './styles.css'

/**
 * Optimistic Demo
 * 展示 React 19 中的乐观更新特性
 */
export default function OptimisticDemo() {
  return (
    <div className="optimistic-demo">
      <h1>Optimistic Updates Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中的乐观更新特性，包括待办事项、购物车和用户资料等
          实际应用场景。乐观更新可以提供更好的用户体验。
        </p>
      </div>

      <section>
        <h2>1. 待办事项列表</h2>
        <ErrorBoundary fallback={<div>Error in todo list</div>}>
          <Suspense fallback={<div>Loading todos...</div>}>
            <TodoList />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. 购物车</h2>
        <ErrorBoundary fallback={<div>Error in shopping cart</div>}>
          <Suspense fallback={<div>Loading cart...</div>}>
            <ShoppingCart />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 用户资料</h2>
        <ErrorBoundary fallback={<div>Error in user profile</div>}>
          <Suspense fallback={<div>Loading profile...</div>}>
            <UserProfile />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
