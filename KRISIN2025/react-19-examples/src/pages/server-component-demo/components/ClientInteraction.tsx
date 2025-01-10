import { useState, useEffect } from 'react'
import { fetchData } from '../api/data'

/**
 * 客户端交互组件
 * 展示客户端状态管理和数据获取
 */
export default function ClientInteraction() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="client-interaction-wrapper">
      <div className="server-data">
        <h3>Server Data</h3>
        {loading ? (
          <div>Loading data...</div>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>

      <div className="client-state">
        <h3>Client State</h3>
        <div className="counter">
          <button
            onClick={() => setCount(c => c + 1)}
            className="counter-button"
          >
            Clicked {count} times
          </button>
          <p className="counter-desc">
            This counter is managed in client-side state
          </p>
        </div>
      </div>
    </div>
  )
}
