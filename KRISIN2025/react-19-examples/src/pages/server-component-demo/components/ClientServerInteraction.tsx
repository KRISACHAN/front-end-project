import { useState, useEffect } from 'react'
import { fetchData } from '../api/data'

/**
 * 展示客户端组件如何与服务器数据交互
 */
export default function ClientServerInteraction() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchData().then(setData)
  }, [])

  return (
    <div className="client-server-interaction">
      <div className="server-data">
        <h3>Server Data</h3>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <div>Loading data...</div>
        )}
      </div>

      <div className="client-interaction">
        <h3>Client Interaction</h3>
        <button onClick={() => setCount(c => c + 1)}>
          Clicked {count} times
        </button>
      </div>
    </div>
  )
}
