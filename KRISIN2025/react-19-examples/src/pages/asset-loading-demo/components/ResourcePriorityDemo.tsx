import { useState, useEffect } from 'react'
import { useResourcePriority } from '../hooks/useResourcePriority'

type Resource = {
  id: number
  type: 'image' | 'font' | 'script' | 'style'
  url: string
  priority: 'high' | 'low' | 'auto'
  size: number
  loadTime?: number
}

const initialResources: Resource[] = [
  {
    id: 1,
    type: 'image',
    url: '/images/hero.jpg',
    priority: 'high',
    size: 250000
  },
  {
    id: 2,
    type: 'font',
    url: 'https://fonts.googleapis.com/css2?family=Inter',
    priority: 'high',
    size: 50000
  },
  {
    id: 3,
    type: 'script',
    url: '/js/analytics.js',
    priority: 'low',
    size: 100000
  }
  // ... 更多资源
]

/**
 * 资源优先级管理演示组件
 * 展示资源加载优先级的管理
 */
export default function ResourcePriorityDemo() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const { updatePriority, metrics } = useResourcePriority()

  // 处理优先级更改
  const handlePriorityChange = (
    resource: Resource,
    priority: 'high' | 'low' | 'auto'
  ) => {
    const updatedResources = resources.map(r =>
      r.id === resource.id ? { ...r, priority } : r
    )
    setResources(updatedResources)
    updatePriority(resource.url, priority)
  }

  // 模拟资源加载
  useEffect(() => {
    const loadResources = async () => {
      const loadedResources = await Promise.all(
        resources.map(async resource => {
          const startTime = performance.now()
          // 模拟加载时间基于优先级
          const delay = resource.priority === 'high' ? 500 : 2000
          await new Promise(resolve => setTimeout(resolve, delay))
          const endTime = performance.now()
          return {
            ...resource,
            loadTime: endTime - startTime
          }
        })
      )
      setResources(loadedResources)
    }

    loadResources()
  }, [])

  return (
    <div className="resource-priority-demo">
      <div className="resources-list">
        <h3>资源列表</h3>
        <div className="list-header">
          <span>资源</span>
          <span>类型</span>
          <span>大小</span>
          <span>优先级</span>
          <span>加载时间</span>
        </div>
        {resources.map(resource => (
          <div
            key={resource.id}
            className={`resource-item ${
              selectedResource?.id === resource.id ? 'selected' : ''
            }`}
            onClick={() => setSelectedResource(resource)}
          >
            <span className="resource-name">
              {resource.url.split('/').pop()}
            </span>
            <span className="resource-type">{resource.type}</span>
            <span className="resource-size">
              {(resource.size / 1024).toFixed(1)}KB
            </span>
            <span className="resource-priority">
              <select
                value={resource.priority}
                onChange={(e) =>
                  handlePriorityChange(
                    resource,
                    e.target.value as 'high' | 'low' | 'auto'
                  )
                }
                onClick={(e) => e.stopPropagation()}
              >
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="auto">Auto</option>
              </select>
            </span>
            <span className="resource-load-time">
              {resource.loadTime
                ? `${resource.loadTime.toFixed(0)}ms`
                : '加载中...'}
            </span>
          </div>
        ))}
      </div>

      <div className="performance-metrics">
        <h3>性能指标</h3>
        <div className="metrics">
          <div className="metric">
            <span>总加载时间:</span>
            <span>{metrics.totalLoadTime.toFixed(2)}ms</span>
          </div>
          <div className="metric">
            <span>优先资源加载时间:</span>
            <span>{metrics.highPriorityLoadTime.toFixed(2)}ms</span>
          </div>
          <div className="metric">
            <span>带宽使用率:</span>
            <span>{metrics.bandwidthUtilization.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {selectedResource && (
        <div className="resource-details">
          <h3>资源详情</h3>
          <div className="details-content">
            <p><strong>URL:</strong> {selectedResource.url}</p>
            <p><strong>类型:</strong> {selectedResource.type}</p>
            <p>
              <strong>大小:</strong>
              {(selectedResource.size / 1024).toFixed(1)}KB
            </p>
            <p><strong>优先级:</strong> {selectedResource.priority}</p>
            <p>
              <strong>加载时间:</strong>
              {selectedResource.loadTime
                ? `${selectedResource.loadTime.toFixed(0)}ms`
                : '加载中...'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
