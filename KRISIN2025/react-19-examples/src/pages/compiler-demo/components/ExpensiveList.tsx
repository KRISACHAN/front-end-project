/**
 * 展示大量数据渲染的组件
 * 在 React 18 中需要使用 memo 来优化
 * 在 React 19 中编译器会自动优化
 */
export default function ExpensiveList({ items }: { items: number[] }) {
  return (
    <div className="expensive-list">
      <ul>
        {items.map(item => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>
    </div>
  )
}
