import { useState } from 'react'
import { useMetaTags } from '../hooks/useMetaTags'

type MetaData = {
  description: string
  keywords: string
  author: string
  ogTitle: string
  ogDescription: string
  ogImage: string
}

const initialMetaData: MetaData = {
  description: 'React 19 新特性演示',
  keywords: 'React, JavaScript, Web Development',
  author: 'Your Name',
  ogTitle: 'React 19 Demo',
  ogDescription: '探索 React 19 的新特性',
  ogImage: '/images/og-image.jpg'
}

/**
 * Meta 标签管理演示组件
 * 展示如何动态管理 Meta 标签
 */
export default function MetaTagsDemo() {
  const [metaData, setMetaData] = useState<MetaData>(initialMetaData)

  // 使用自定义 hook 管理 meta 标签
  useMetaTags(metaData)

  const handleMetaChange = (
    key: keyof MetaData,
    value: string
  ) => {
    setMetaData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="meta-tags-demo">
      <div className="meta-form">
        {Object.entries(metaData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) =>
                handleMetaChange(key as keyof MetaData, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <div className="meta-preview">
        <h3>Meta 标签预览</h3>
        <pre>
          {Object.entries(metaData).map(([key, value]) => (
            `<meta name="${key}" content="${value}" />\n`
          ))}
        </pre>
      </div>

      <div className="meta-info">
        <h3>提示</h3>
        <ul>
          <li>修改上面的值会实时更新页面的 meta 标签</li>
          <li>使用浏览器开发工具查看 head 中的变化</li>
          <li>这些变化对 SEO 和社交媒体分享很重要</li>
        </ul>
      </div>
    </div>
  )
}
