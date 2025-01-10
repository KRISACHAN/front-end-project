import { Post } from '../types'

// 模拟文章数据
export async function fetchPosts(): Promise<Post[]> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      title: 'Understanding Server Components',
      excerpt: 'Server Components are a new way to build React applications...',
      author: 'Jane Smith',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'The Future of React',
      excerpt: 'React 19 brings exciting new features to the framework...',
      author: 'John Doe',
      date: '2024-03-14'
    },
    {
      id: 3,
      title: 'Optimizing React Applications',
      excerpt: 'Learn how to improve your React app performance...',
      author: 'Mike Johnson',
      date: '2024-03-13'
    }
  ]
}
