import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ImageLoadingDemo from './components/ImageLoadingDemo'
import FontLoadingDemo from './components/FontLoadingDemo'
import ResourcePriorityDemo from './components/ResourcePriorityDemo'
import './styles.css'

/**
 * Asset Loading Demo
 * 展示 React 19 中的资源加载优化特性
 */
export default function AssetLoadingDemo() {
  return (
    <div className="asset-loading-demo">
      <h1>Asset Loading Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中的资源加载优化特性，包括图片加载、
          字体加载和资源优先级管理等功能。
        </p>
      </div>

      <section>
        <h2>1. 图片加载优化</h2>
        <ErrorBoundary fallback={<div>Error in image loading demo</div>}>
          <Suspense fallback={<div>Loading image demo...</div>}>
            <ImageLoadingDemo />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. 字体加载优化</h2>
        <ErrorBoundary fallback={<div>Error in font loading demo</div>}>
          <FontLoadingDemo />
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. 资源优先级管理</h2>
        <ErrorBoundary fallback={<div>Error in resource priority demo</div>}>
          <Suspense fallback={<div>Loading priority demo...</div>}>
            <ResourcePriorityDemo />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
