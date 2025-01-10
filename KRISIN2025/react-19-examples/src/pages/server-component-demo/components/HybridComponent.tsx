import { Suspense } from 'react'
import ServerContent from './ServerContent'
import ClientInteraction from './ClientInteraction'

/**
 * 混合组件 - 展示服务器组件和客户端组件的协同工作
 */
export default function HybridComponent() {
  return (
    <div className="hybrid-component">
      <h3>Hybrid Rendering</h3>

      {/* 服务器组件 */}
      <Suspense fallback={<div>Loading server content...</div>}>
        <ServerContent />
      </Suspense>

      {/* 客户端组件 */}
      <ClientInteraction />
    </div>
  )
}
