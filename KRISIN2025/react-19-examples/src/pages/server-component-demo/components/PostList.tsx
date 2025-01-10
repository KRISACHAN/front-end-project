import { use } from 'react'
import { fetchPosts } from '../api/posts'

/**
 * 模拟服务器组件 - 文章列表
 */
export default function PostList() {
  // 使用 use hook 处理 Promise
  const posts = use(fetchPosts())

  return (
    <div className="post-list">
      <h3>Posts</h3>
      <div className="posts">
        {posts.map(post => (
          <article key={post.id} className="post">
            <h4>{post.title}</h4>
            <p>{post.excerpt}</p>
            <div className="post-meta">
              <span>Author: {post.author}</span>
              <span>Date: {post.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
