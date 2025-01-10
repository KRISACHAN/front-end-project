import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import UseOptimisticDemo from './components/UseOptimisticDemo'
import UseFormStateDemo from './components/UseFormStateDemo'
import UseTransitionDemo from './components/UseTransitionDemo'
import './styles.css'

/**
 * Hooks Demo
 * 展示 React 19 中的新 Hooks
 */
export default function HooksDemo() {
  return (
    <div className="hooks-demo">
      <h1>Hooks Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中的新 Hooks，包括 useOptimistic、
          useFormState 和 useTransition 等特性。
        </p>
      </div>

      <section>
        <h2>1. useOptimistic Hook</h2>
        <ErrorBoundary fallback={<div>Error in optimistic demo</div>}>
          <Suspense fallback={<div>Loading optimistic demo...</div>}>
            <UseOptimisticDemo />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. useFormState Hook</h2>
        <ErrorBoundary fallback={<div>Error in form state demo</div>}>
          <UseFormStateDemo />
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. useTransition Hook</h2>
        <ErrorBoundary fallback={<div>Error in transition demo</div>}>
          <Suspense fallback={<div>Loading transition demo...</div>}>
            <UseTransitionDemo />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
