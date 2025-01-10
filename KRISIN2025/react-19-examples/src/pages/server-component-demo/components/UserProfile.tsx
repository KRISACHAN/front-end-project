import { Suspense } from 'react'
import { use } from 'react'
import { fetchUser } from '../api/user'

/**
 * 模拟服务器组件 - 用户信息
 */
export default function UserProfile({ userId }: { userId: string }) {
    const user = use(fetchUser(userId))

    return (
      <div className="user-profile">
        <h3>User Profile</h3>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} />
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      </div>
    )
  }
