import { useEffect, useRef, useState } from 'react'
import { defineCustomElement } from '../utils/customElements'

type CustomEvent = {
  type: string
  detail: any
  timestamp: number
}

/**
 * 事件处理演示组件
 * 展示 Web Components 的事件处理机制
 */
export default function EventHandlingDemo() {
  const [events, setEvents] = useState<CustomEvent[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 定义自定义事件按钮
    defineCustomElement('event-button', {
      template: `
        <button class="custom-button">
          <style>
            .custom-button {
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              background: var(--button-bg, #007bff);
              color: white;
              cursor: pointer;
              transition: all 0.2s;
            }
            .custom-button:hover {
              opacity: 0.9;
            }
          </style>
          <slot>Click me</slot>
        </button>
      `,
      init(element) {
        const button = element.querySelector('button')!

        // 点击事件
        button.addEventListener('click', () => {
          const event = new CustomEvent('custom-click', {
            bubbles: true,
            composed: true,
            detail: {
              buttonId: element.getAttribute('id'),
              timestamp: Date.now()
            }
          })
          element.dispatchEvent(event)
        })

        // 悬停事件
        button.addEventListener('mouseenter', () => {
          const event = new CustomEvent('custom-hover', {
            bubbles: true,
            composed: true,
            detail: {
              buttonId: element.getAttribute('id'),
              timestamp: Date.now()
            }
          })
          element.dispatchEvent(event)
        })
      }
    })
  }, [])

  // 事件处理器
  const handleCustomEvent = (event: CustomEvent) => {
    setEvents(prev => [
      {
        type: event.type,
        detail: event.detail,
        timestamp: Date.now()
      },
      ...prev.slice(0, 9) // 只保留最近的10条事件
    ])
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 添加事件监听
    container.addEventListener('custom-click', handleCustomEvent as any)
    container.addEventListener('custom-hover', handleCustomEvent as any)

    return () => {
      // 清理事件监听
      container.removeEventListener('custom-click', handleCustomEvent as any)
      container.removeEventListener('custom-hover', handleCustomEvent as any)
    }
  }, [])

  return (
    <div className="event-handling-demo" ref={containerRef}>
      <div className="buttons-container">
        <event-button id="btn1">按钮 1</event-button>
        <event-button id="btn2">按钮 2</event-button>
        <event-button id="btn3">按钮 3</event-button>
      </div>

      <div className="events-log">
        <h3>事件日志</h3>
        <div className="log-container">
          {events.map((event, index) => (
            <div key={index} className="log-entry">
              <span className="event-type">{event.type}</span>
              <span className="event-detail">
                Button: {event.detail.buttonId}
              </span>
              <span className="event-time">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-info">
        <h3>事件处理特性</h3>
        <ul>
          <li>自定义事件的创建和分发</li>
          <li>事件冒泡和组合</li>
          <li>React 中的事件处理</li>
          <li>事件委托模式</li>
        </ul>
      </div>
    </div>
  )
}
