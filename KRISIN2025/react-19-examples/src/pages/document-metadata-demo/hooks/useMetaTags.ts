import { useEffect } from 'react'

type MetaTagsConfig = {
  [key: string]: string
}

export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    const metaTags: HTMLMetaElement[] = []

    Object.entries(config).forEach(([name, content]) => {
      // 移除现有的 meta 标签
      const existingTag = document.querySelector(
        `meta[name="${name}"]`
      )
      if (existingTag) {
        existingTag.remove()
      }

      // 创建新的 meta 标签
      const tag = document.createElement('meta')
      tag.name = name
      tag.content = content
      document.head.appendChild(tag)
      metaTags.push(tag)
    })

    // 清理函数
    return () => {
      metaTags.forEach(tag => tag.remove())
    }
  }, [config])
}
