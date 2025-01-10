import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SimpleForm from './components/SimpleForm'
import AsyncForm from './components/AsyncForm'
import OptimisticForm from './components/OptimisticForm'
import './styles.css'

/**
 * Actions Demo
 * 展示 React 19 中的 Actions API 特性
 */
export default function ActionsDemo() {
  return (
    <div className="actions-demo">
      <h1>Actions Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中新的 Actions API，包括表单处理、
          服务器操作和乐观更新等特性。
        </p>
      </div>

      <section>
        <h2>1. 基础表单处理</h2>
        <ErrorBoundary fallback={<div>Error in form submission</div>}>
          <SimpleForm />
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. 异步表单提交</h2>
        <ErrorBoundary fallback={<div>Error in async form</div>}>
          <Suspense fallback={<div>Submitting...</div>}>
            <AsyncForm />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 乐观更新示例</h2>
        <ErrorBoundary fallback={<div>Error in optimistic update</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <OptimisticForm />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
