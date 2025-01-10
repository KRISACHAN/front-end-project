import { useState } from 'react'
import ExpensiveList from './components/ExpensiveList'
import SimpleCounter from './components/SimpleCounter'
import ComplexCalculation from './components/ComplexCalculation'
import './styles.css'

/**
 * React 19 Compiler Demo
 * 展示 React 19 编译器的自动优化能力，不再需要手动使用 useMemo、useCallback 等
 */
export default function CompilerDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="compiler-demo">
      <h1>React 19 Compiler Demo</h1>

      <section>
        <h2>1. 自动记忆化组件</h2>
        <p>React 19 编译器会自动优化组件重渲染，不再需要手动使用 memo</p>
        <ExpensiveList items={Array.from({ length: 1000 }, (_, i) => i)} />
      </section>

      <section>
        <h2>2. 自动优化事件处理</h2>
        <p>不再需要 useCallback 来优化事件处理函数</p>
        <SimpleCounter count={count} onIncrement={() => setCount(count + 1)} />
      </section>

      <section>
        <h2>3. 自动优化计算</h2>
        <p>不再需要 useMemo 来优化复杂计算</p>
        <ComplexCalculation value={count} />
      </section>
    </div>
  )
}
