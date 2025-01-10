import { useState, useEffect } from 'react'

type Metrics = {
  totalLoadTime: number
  highPriorityLoadTime: number
  bandwidthUtilization: number
}

type ResourcePriorityHook = {
  updatePriority: (url: string, priority: string) => void
  metrics: Metrics
}

export function useResourcePriority(): ResourcePriorityHook {
  const [metrics, setMetrics] = useState<Metrics>({
    totalLoadTime: 0,
    highPriorityLoadTime: 0,
    bandwidthUtilization: 0
  })

  const updatePriority = (url: string, priority: string) => {
    // 查找页面上的资源元素
    const element = document.querySelector(
      `[src="${url}"], [href="${url}"]`
    )

    if (element) {
      // 更新资源优先级
      if ('fetchPriority' in element) {
        (element as any).fetchPriority = priority
      }

      // 模拟性能指标更新
      const startTime = performance.now()
      setTimeout(() => {
        const endTime = performance.now()
        const loadTime = endTime - startTime

        setMetrics(prev => ({
          totalLoadTime: prev.totalLoadTime + loadTime,
          highPriorityLoadTime:
            priority === 'high'
              ? prev.highPriorityLoadTime + loadTime
              : prev.highPriorityLoadTime,
          bandwidthUtilization: Math.random() * 100
        }))
      }, Math.random() * 1000)
    }
  }

  // 初始化性能指标
  useEffect(() => {
    setMetrics({
      totalLoadTime: Math.random() * 2000,
      highPriorityLoadTime: Math.random() * 1000,
      bandwidthUtilization: Math.random() * 100
    })
  }, [])

  return { updatePriority, metrics }
}
