import { User } from '../types'

// 模拟用户数据
export async function fetchUser(userId: string): Promise<User> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: 'https://via.placeholder.com/100'
  }
}
