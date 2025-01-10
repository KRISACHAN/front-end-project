import { useState, useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

type ImageItem = {
  id: number
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

const images: ImageItem[] = [
  {
    id: 1,
    src: '/images/hero.jpg',
    alt: '英雄图片',
    width: 1200,
    height: 600,
    priority: true,
    loading: 'eager'
  },
  {
    id: 2,
    src: '/images/content-1.jpg',
    alt: '内容图片 1',
    width: 800,
    height: 400,
    loading: 'lazy'
  },
  // ... 更多图片
]

/**
 * 图片加载优化演示组件
 * 展示图片加载的各种优化技术
 */
export default function ImageLoadingDemo() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(galleryRef)

  // 模拟图片加载性能数据
  const [performance, setPerformance] = useState({
    loadTime: 0,
    bandwidth: 0
  })

  useEffect(() => {
    if (isInView) {
      const startTime = performance.now()

      // 模拟性能数据收集
      window.setTimeout(() => {
        const endTime = performance.now()
        setPerformance({
          loadTime: endTime - startTime,
          bandwidth: Math.random() * 1000
        })
      }, 1000)
    }
  }, [isInView])

  return (
    <div className="image-loading-demo">
      <div className="demo-controls">
        <h3>图片加载优化选项</h3>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
            />
            启用懒加载
          </label>
          <label>
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
            />
            使用优先级提示
          </label>
          <label>
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
            />
            启用占位符
          </label>
        </div>
      </div>

      <div className="image-gallery" ref={galleryRef}>
        {images.map(image => (
          <div
            key={image.id}
            className="image-item"
            onClick={() => setSelectedImage(image)}
          >
            <div className="image-wrapper">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={image.loading}
                fetchPriority={image.priority ? 'high' : 'auto'}
              />
            </div>
            <div className="image-info">
              <span>{image.alt}</span>
              <span className="image-size">
                {image.width}x{image.height}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      )}

      <div className="performance-metrics">
        <h3>性能指标</h3>
        <div className="metrics">
          <div className="metric">
            <span>加载时间:</span>
            <span>{performance.loadTime.toFixed(2)}ms</span>
          </div>
          <div className="metric">
            <span>带宽使用:</span>
            <span>{performance.bandwidth.toFixed(2)}KB/s</span>
          </div>
        </div>
      </div>
    </div>
  )
}
