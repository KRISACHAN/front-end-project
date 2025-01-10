import { useEffect, useRef, useState } from 'react'
import { defineCustomElement } from '../utils/customElements'

// 定义自定义元素类型
type CustomCounter = HTMLElement & {
  count: number
  onCountChange: (count: number) => void
}

/**
 * 自定义元素演示组件
 * 展示如何在 React 中使用和创建 Web Components
 */
export default function CustomElementDemo() {
  const counterRef = useRef<CustomCounter>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 定义自定义元素
    defineCustomElement('custom-counter', {
      props: ['count'],
      template: `
        <div class="counter">
          <style>
            .counter {
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
              text-align: center;
            }
            .value {
              font-size: 24px;
              font-weight: bold;
              margin: 10px 0;
            }
            button {
              margin: 0 5px;
              padding: 5px 10px;
            }
          </style>
          <div class="value"></div>
          <button class="decrement">-</button>
          <button class="increment">+</button>
        </div>
      `,
      observedAttributes: ['count'],
      init(element) {
        const value = element.querySelector('.value')!
        const decrement = element.querySelector('.decrement')!
        const increment = element.querySelector('.increment')!

        // 更新显示
        const updateDisplay = () => {
          value.textContent = element.count.toString()
          element.onCountChange?.(element.count)
        }

        // 事件处理
        decrement.addEventListener('click', () => {
          element.count--
          updateDisplay()
        })

        increment.addEventListener('click', () => {
          element.count++
          updateDisplay()
        })

        // 初始化显示
        element.count = 0
        updateDisplay()
      }
    })
  }, [])

  return (
    <div className="custom-element-demo">
      <div className="demo-section">
        <h3>自定义计数器元素</h3>
        <custom-counter
          ref={counterRef}
          count={count}
          onCountChange={(newCount: number) => setCount(newCount)}
        />
      </div>

      <div className="demo-section">
        <h3>React 状态同步</h3>
        <p>当前计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          从 React 增加
        </button>
        <button onClick={() => setCount(count - 1)}>
          从 React 减少
        </button>
      </div>

      <div className="demo-info">
        <h3>实现细节</h3>
        <ul>
          <li>使用 Custom Elements API 创建自定义元素</li>
          <li>在 Shadow DOM 中封装样式和模板</li>
          <li>通过属性和事件实现双向数据绑定</li>
          <li>展示与 React 状态的同步</li>
        </ul>
      </div>
    </div>
  )
}
