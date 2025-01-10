import { useTransition, useState, Suspense } from 'react'

// 模拟数据获取
async function fetchData(query: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `结果 ${i + 1} for "${query}"`,
    description: `这是关于 "${query}" 的搜索结果 ${i + 1} 的详细描述...`
  }))
}

// 模拟的搜索结果组件
function SearchResults({ query }: { query: string }) {
  if (!query) return null

  // 这会触发 Suspense
  const results = use(fetchData(query))

  return (
    <div className="search-results">
      {results.map(result => (
        <div key={result.id} className="result-item">
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * useTransition Hook Demo
 * 展示过渡状态管理
 */
export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [deferredQuery, setDeferredQuery] = useState('')

  const handleSearch = (value: string) => {
    setQuery(value)
    startTransition(() => {
      setDeferredQuery(value)
    })
  }

  return (
    <div className="transition-demo">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="输入搜索关键词..."
          className="search-input"
        />

        {isPending && (
          <div className="loading-indicator">
            搜索中...
          </div>
        )}
      </div>

      <Suspense fallback={<div className="loading">加载结果中...</div>}>
        <SearchResults query={deferredQuery} />
      </Suspense>

      <div className="transition-info">
        <h3>useTransition 特性:</h3>
        <ul>
          <li>非阻塞更新</li>
          <li>可中断渲染</li>
          <li>加载状态管理</li>
          <li>优化用户体验</li>
        </ul>
      </div>
    </div>
  )
}

// 简单的 use Hook 实现
function use<T>(promise: Promise<T>): T {
  if (promise.status === 'fulfilled') {
    return promise.value
  } else if (promise.status === 'rejected') {
    throw promise.reason
  } else {
    throw promise
  }
}

// 扩展 Promise 类型
declare global {
  interface Promise<T> {
    status?: 'pending' | 'fulfilled' | 'rejected'
    value?: T
    reason?: any
  }
}
