import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'

type SEOData = {
  title: string
  description: string
  canonical: string
  robots: string
  structuredData: {
    '@type': string
    name: string
    description: string
    url: string
  }
}

const initialSEOData: SEOData = {
  title: 'React 19 SEO Demo',
  description: '探索 React 19 中的 SEO 优化特性',
  canonical: 'https://example.com/react-19-demo',
  robots: 'index, follow',
  structuredData: {
    '@type': 'WebPage',
    name: 'React 19 Demo',
    description: 'React 19 新特性演示和教程',
    url: 'https://example.com/react-19-demo'
  }
}

/**
 * SEO 优化演示组件
 * 展示如何优化页面的 SEO
 */
export default function SEODemo() {
  const [seoData, setSEOData] = useState<SEOData>(initialSEOData)

  // 使用自定义 hook 管理 SEO 相关标签
  useSEO(seoData)

  const handleBasicChange = (
    key: keyof Omit<SEOData, 'structuredData'>,
    value: string
  ) => {
    setSEOData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleStructuredDataChange = (
    key: keyof SEOData['structuredData'],
    value: string
  ) => {
    setSEOData(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        [key]: value
      }
    }))
  }

  return (
    <div className="seo-demo">
      <div className="seo-form">
        <h3>基本 SEO 设置</h3>
        <div className="form-group">
          <label htmlFor="title">标题:</label>
          <input
            type="text"
            id="title"
            value={seoData.title}
            onChange={(e) => handleBasicChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">描述:</label>
          <textarea
            id="description"
            value={seoData.description}
            onChange={(e) => handleBasicChange('description', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="canonical">规范链接:</label>
          <input
            type="text"
            id="canonical"
            value={seoData.canonical}
            onChange={(e) => handleBasicChange('canonical', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="robots">Robots:</label>
          <select
            id="robots"
            value={seoData.robots}
            onChange={(e) => handleBasicChange('robots', e.target.value)}
          >
            <option value="index, follow">允许索引和跟踪</option>
            <option value="noindex, follow">禁止索引但允许跟踪</option>
            <option value="index, nofollow">允许索引但禁止跟踪</option>
            <option value="noindex, nofollow">禁止索引和跟踪</option>
          </select>
        </div>

        <h3>结构化数据</h3>
        <div className="form-group">
          <label htmlFor="sd-name">名称:</label>
          <input
            type="text"
            id="sd-name"
            value={seoData.structuredData.name}
            onChange={(e) => handleStructuredDataChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sd-description">描述:</label>
          <textarea
            id="sd-description"
            value={seoData.structuredData.description}
            onChange={(e) =>
              handleStructuredDataChange('description', e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="sd-url">URL:</label>
          <input
            type="text"
            id="sd-url"
            value={seoData.structuredData.url}
            onChange={(e) => handleStructuredDataChange('url', e.target.value)}
          />
        </div>
      </div>

      <div className="seo-preview">
        <h3>SEO 预览</h3>
        <div className="preview-section">
          <h4>Google 搜索结果预览</h4>
          <div className="google-preview">
            <div className="preview-title">{seoData.title}</div>
            <div className="preview-url">{seoData.canonical}</div>
            <div className="preview-description">
              {seoData.description}
            </div>
          </div>
        </div>

        <div className="preview-section">
          <h4>结构化数据预览</h4>
          <pre>
            {JSON.stringify(
              {
                '@context': 'https://schema.org',
                ...seoData.structuredData
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
