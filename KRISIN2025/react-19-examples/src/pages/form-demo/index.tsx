import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import BasicForm from './components/BasicForm'
import ValidationForm from './components/ValidationForm'
import DynamicForm from './components/DynamicForm'
import './styles.css'

/**
 * Form Demo
 * 展示 React 19 中的新表单特性
 */
export default function FormDemo() {
  return (
    <div className="form-demo">
      <h1>Form Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中的新表单特性，包括内置验证、动态表单和
          自定义控件等功能。
        </p>
      </div>

      <section>
        <h2>1. 基础表单控件</h2>
        <ErrorBoundary fallback={<div>Error in basic form</div>}>
          <BasicForm />
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. 表单验证</h2>
        <ErrorBoundary fallback={<div>Error in validation form</div>}>
          <ValidationForm />
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 动态表单</h2>
        <ErrorBoundary fallback={<div>Error in dynamic form</div>}>
          <Suspense fallback={<div>Loading dynamic form...</div>}>
            <DynamicForm />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
