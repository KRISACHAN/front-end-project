import { useState, useTransition } from 'react'

// 模拟 API 调用
async function updateCounter(value: number): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return value + 1
  }

export default function UseTransitionDemo() {
  const [count, setCount] = useState(0)
  const [isPending, startTransition] = useTransition()

  // 处理点击事件
  const handleClick = () => {
    startTransition(async () => {
      const newCount = await updateCounter(count)
      setCount(newCount)
    })
  }

  return (
    <div>
      <h1>useTransition Demo</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div>Count: {count}</div>
        <button
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update'}
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <pre>{JSON.stringify({ count, isPending }, null, 2)}</pre>
      </div>
    </div>
  )
}
