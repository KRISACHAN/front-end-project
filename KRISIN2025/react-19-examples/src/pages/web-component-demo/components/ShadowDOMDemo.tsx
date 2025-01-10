import { useEffect, useRef } from 'react'
import { createShadowComponent } from '../utils/shadowDOM'

type Theme = {
  primary: string
  secondary: string
  text: string
  background: string
}

const themes: Record<string, Theme> = {
  light: {
    primary: '#007bff',
    secondary: '#6c757d',
    text: '#333333',
    background: '#ffffff'
  },
  dark: {
    primary: '#0056b3',
    secondary: '#495057',
    text: '#ffffff',
    background: '#333333'
  }
}

/**
 * Shadow DOM 演示组件
 * 展示如何使用 Shadow DOM 实现样式隔离
 */
export default function ShadowDOMDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (!containerRef.current) return

    // 创建带有 Shadow DOM 的卡片组件
    const Card = createShadowComponent('shadow-card', {
      template: `
        <div class="card">
          <style>
            .card {
              padding: 20px;
              border-radius: 8px;
              margin: 10px;
              transition: all 0.3s ease;
            }
            .card-header {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .card-content {
              line-height: 1.5;
            }
            :host {
              display: block;
              --card-bg: ${themes[currentTheme].background};
              --card-text: ${themes[currentTheme].text};
              --card-primary: ${themes[currentTheme].primary};
            }
            :host(.themed) .card {
              background-color: var(--card-bg);
              color: var(--card-text);
              border: 1px solid var(--card-primary);
            }
          </style>
          <div class="card-header">
            <slot name="header">默认标题</slot>
          </div>
          <div class="card-content">
            <slot>默认内容</slot>
          </div>
        </div>
      `
    })

    // 添加卡片实例
    const card = new Card()
    card.classList.add('themed')
    containerRef.current.appendChild(card)

    return () => {
      card.remove()
    }
  }, [currentTheme])

  return (
    <div className="shadow-dom-demo">
      <div className="demo-controls">
        <h3>主题切换</h3>
        <div className="theme-switcher">
          <button
            className={currentTheme === 'light' ? 'active' : ''}
            onClick={() => setCurrentTheme('light')}
          >
            浅色主题
          </button>
          <button
            className={currentTheme === 'dark' ? 'active' : ''}
            onClick={() => setCurrentTheme('dark')}
          >
            深色主题
          </button>
        </div>
      </div>

      <div className="cards-container" ref={containerRef}>
        <shadow-card>
          <h3 slot="header">Shadow DOM 卡片 1</h3>
          <p>这是一个使用 Shadow DOM 的卡片组件示例。</p>
        </shadow-card>

        <shadow-card>
          <h3 slot="header">Shadow DOM 卡片 2</h3>
          <p>Shadow DOM 提供了样式隔离的能力。</p>
        </shadow-card>
      </div>

      <div className="demo-info">
        <h3>Shadow DOM 特性</h3>
        <ul>
          <li>样式封装和隔离</li>
          <li>使用 CSS 自定义属性实现主题</li>
          <li>插槽（Slots）的使用</li>
          <li>Shadow DOM 生命周期管理</li>
        </ul>
      </div>
    </div>
  )
}
