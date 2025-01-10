import { Link } from 'react-router'
import './styles.css'

type Feature = {
  path: string
  title: string
  description: string
  status: 'stable' | 'new' | 'improved'
}

const features: Feature[] = [
  {
    path: '/compiler',
    title: 'Compiler Optimization',
    description: '展示 React 19 编译器优化，包括自动记忆化、自动批处理等编译时优化特性。',
    status: 'new'
  },
  {
    path: '/server-component',
    title: 'Server Components',
    description: '探索 React 19 中的服务器组件特性，包括数据获取、混合渲染和客户端交互等场景。',
    status: 'stable'
  },
  {
    path: '/actions',
    title: 'Actions API',
    description: '展示新的服务器操作 API，用于处理表单提交、数据变更等服务器交互场景。',
    status: 'new'
  },
  {
    path: '/form',
    title: 'Form Handling',
    description: '展示增强的表单处理能力，包括 useFormState、useFormStatus 等新的表单 Hooks。',
    status: 'new'
  },
  {
    path: '/optimistic',
    title: 'Optimistic Updates',
    description: '展示乐观更新模式，使用 useOptimistic 实现即时反馈的用户界面。',
    status: 'new'
  },
  {
    path: '/document-metadata',
    title: 'Document Metadata',
    description: '使用 React 19 新增的文档元数据支持，包括动态标题、Meta 标签和 SEO 优化等功能。',
    status: 'new'
  },
  {
    path: '/asset-loading',
    title: 'Asset Loading',
    description: '使用新的资源预加载 API，包括图片加载优化、字体加载和资源优先级管理等特性。',
    status: 'improved'
  },
  {
    path: '/web-component',
    title: 'Web Components',
    description: '展示与 Web Components 的集成，包括自定义元素、Shadow DOM 和事件处理等特性。',
    status: 'improved'
  },
  {
    path: '/use-hook',
    title: 'Use Hook',
    description: '展示新的 use Hook 特性，用于数据获取、状态管理和资源处理等场景。',
    status: 'new'
  }
]

export default function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1>React 19 Features Demo</h1>
        <p className="subtitle">
          探索和体验 React 19 中的新特性和改进
        </p>
      </header>

      <main className="features">
        {features.map(feature => (
          <Link
            key={feature.path}
            to={feature.path}
            className="feature-card"
          >
            <div className="card-header">
              <h2>{feature.title}</h2>
              <span className={`status ${feature.status}`}>
                {feature.status}
              </span>
            </div>
            <p>{feature.description}</p>
          </Link>
        ))}
      </main>

      <footer className="footer">
        <p>
          注意：某些功能可能需要特定的运行时或框架支持。
          详细信息请参考各个演示的说明。
        </p>
      </footer>
    </div>
  )
}
