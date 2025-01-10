import { useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/**
 * 动态标题演示组件
 * 展示如何动态更新文档标题
 */
export default function DynamicTitleDemo() {
  const [count, setCount] = useState(0)
  const [customTitle, setCustomTitle] = useState('')

  // 使用自定义 hook 管理文档标题
  useDocumentTitle(
    customTitle || `React 19 Demo (${count} 次点击)`
  )

  return (
    <div className="title-demo">
      <div className="demo-section">
        <h3>计数器标题</h3>
        <p>点击按钮更新标题中的计数</p>
        <button onClick={() => setCount(count + 1)}>
          点击我 ({count})
        </button>
      </div>

      <div className="demo-section">
        <h3>自定义标题</h3>
        <p>输入自定义标题文本</p>
        <div className="input-group">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="输入自定义标题..."
          />
          <button onClick={() => setCustomTitle('')}>
            重置
          </button>
        </div>
      </div>

      <div className="title-preview">
        <h3>当前标题预览</h3>
        <p className="preview">
          {customTitle || `React 19 Demo (${count} 次点击)`}
        </p>
      </div>
    </div>
  )
}
