import { useState, useEffect } from 'react'
import { useFontLoading } from '../hooks/useFontLoading'

const fontFamilies = [
  {
    name: 'Inter',
    weights: ['400', '500', '700'],
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
  },
  {
    name: 'Roboto Mono',
    weights: ['400', '700'],
    url: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap'
  }
]

/**
 * 字体加载优化演示组件
 * 展示字体加载的各种优化技术
 */
export default function FontLoadingDemo() {
  const [selectedFont, setSelectedFont] = useState(fontFamilies[0])
  const [fontSize, setFontSize] = useState(16)
  const [text, setText] = useState(
    '这是一段示例文本，用于展示不同字体的效果。'
  )

  const { loading, error } = useFontLoading(selectedFont.url)

  // 模拟字体加载性能数据
  const [performance, setPerformance] = useState({
    loadTime: 0,
    swapTime: 0
  })

  useEffect(() => {
    const startTime = performance.now()

    // 模拟性能数据收集
    return () => {
      const endTime = performance.now()
      setPerformance({
        loadTime: endTime - startTime,
        swapTime: Math.random() * 100
      })
    }
  }, [selectedFont])

  return (
    <div className="font-loading-demo">
      <div className="demo-controls">
        <div className="control-group">
          <label>选择字体:</label>
          <select
            value={selectedFont.name}
            onChange={(e) => {
              const font = fontFamilies.find(f => f.name === e.target.value)
              if (font) setSelectedFont(font)
            }}
          >
            {fontFamilies.map(font => (
              <option key={font.name} value={font.name}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>字体大小: {fontSize}px</label>
          <input
            type="range"
            min="12"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>测试文本:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div
        className={`font-preview ${loading ? 'loading' : ''}`}
        style={{
          fontFamily: `"${selectedFont.name}", sans-serif`,
          fontSize: `${fontSize}px`
        }}
      >
        {loading ? (
          <div className="loading-placeholder">加载字体中...</div>
        ) : error ? (
          <div className="error-message">字体加载失败</div>
        ) : (
          <div className="preview-text">{text}</div>
        )}
      </div>

      <div className="font-info">
        <h3>字体信息</h3>
        <ul>
          <li>字体名称: {selectedFont.name}</li>
          <li>可用字重: {selectedFont.weights.join(', ')}</li>
          <li>加载状态: {loading ? '加载中' : '已加载'}</li>
        </ul>
      </div>

      <div className="performance-metrics">
        <h3>性能指标</h3>
        <div className="metrics">
          <div className="metric">
            <span>加载时间:</span>
            <span>{performance.loadTime.toFixed(2)}ms</span>
          </div>
          <div className="metric">
            <span>字体交换时间:</span>
            <span>{performance.swapTime.toFixed(2)}ms</span>
          </div>
        </div>
      </div>
    </div>
  )
}
