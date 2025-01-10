import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MetaTagsDemo from './components/MetaTagsDemo'
import DynamicTitleDemo from './components/DynamicTitleDemo'
import SEODemo from './components/SEODemo'
import './styles.css'

/**
 * Document Metadata Demo
 * 展示 React 19 中的文档元数据特性
 */
export default function DocumentMetadataDemo() {
  return (
    <div className="metadata-demo">
      <h1>Document Metadata Demo</h1>

      <div className="note">
        <p>
          展示 React 19 中的文档元数据特性，包括动态标题、
          Meta 标签管理和 SEO 优化等功能。
        </p>
      </div>

      <section>
        <h2>1. 动态标题管理</h2>
        <ErrorBoundary fallback={<div>Error in title demo</div>}>
          <DynamicTitleDemo />
        </ErrorBoundary>
      </section>

      <section>
        <h2>2. Meta 标签管理</h2>
        <ErrorBoundary fallback={<div>Error in meta tags demo</div>}>
          <Suspense fallback={<div>Loading meta tags demo...</div>}>
            <MetaTagsDemo />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <h2>3. SEO 优化</h2>
        <ErrorBoundary fallback={<div>Error in SEO demo</div>}>
          <Suspense fallback={<div>Loading SEO demo...</div>}>
            <SEODemo />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  )
}
