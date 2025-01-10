/**
 * 简单计数器组件
 * 在 React 18 中需要使用 useCallback 来优化事件处理函数
 * 在 React 19 中编译器会自动优化
 */
export default function SimpleCounter({
  count,
  onIncrement
}: {
  count: number
  onIncrement: () => void
}) {
  return (
    <div className="simple-counter">
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  )
}
