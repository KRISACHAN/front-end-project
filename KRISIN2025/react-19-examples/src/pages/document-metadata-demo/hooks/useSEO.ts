import { useEffect } from 'react'

type SEOConfig = {
  title: string
  description: string
  canonical: string
  robots: string
  structuredData: object
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // 更新标题
    document.title = config.title

    // 更新 meta 描述
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', config.description)

    // 更新 robots
    let metaRobots = document.querySelector('meta[name="robots"]')
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.setAttribute('name', 'robots')
      document.head.appendChild(metaRobots)
    }
    metaRobots.setAttribute('content', config.robots)

    // 更新规范链接
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', config.canonical)

    // 更新结构化数据
    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]'
    )
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      ...config.structuredData
    })

    // 清理函数
    return () => {
      // 可以选择是否在组件卸载时清理这些标签
    }
  }, [config])
}
