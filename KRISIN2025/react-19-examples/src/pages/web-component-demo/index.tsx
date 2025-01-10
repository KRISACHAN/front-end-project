import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CustomElementDemo from './components/CustomElementDemo'
import ShadowDOMDemo from './components/ShadowDOMDemo'
import EventHandlingDemo from './components/EventHandlingDemo'
import './styles.css'

/**
 * Web Component Demo
 * 展示 React 19 与 Web Components 的集成
 */
export default function WebComponentDemo() {
  return (
    <div className="web-component-demo">
      <h1>Web Component Demo</h1>

      <div className="note">
        <p>
          展示 React 19 与 Web Components 的集成，包括自定义元素、
          Shadow DOM 和事件处理等特性。
        </p>
      </div>

      <section>
        <h2>1. 自定义元素</h2>
        <ErrorBoundary fallback={<div>Error in custom element demo</div>}>
          <CustomElementDemo />
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. Shadow DOM</h2>
        <ErrorBoundary fallback={<div>Error in shadow DOM demo</div>}>
          <Suspense fallback={<div>Loading shadow DOM demo...</div>}>
            <ShadowDOMDemo />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 事件处理</h2>
        <ErrorBoundary fallback={<div>Error in event handling demo</div>}>
          <EventHandlingDemo />
        </ErrorBoundary>
      </section>
    </div>
  )
}
