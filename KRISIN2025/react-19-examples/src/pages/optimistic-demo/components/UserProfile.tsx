import { useOptimistic } from 'react'
import { useState, startTransition } from 'react'

type Profile = {
  name: string
  bio: string
  avatar: string
  email: string
  location: string
  pending?: {
    [key: string]: boolean
  }
}

// 模拟用户数据
const initialProfile: Profile = {
  name: 'React Developer',
  bio: '热爱 React 和前端开发的工程师',
  avatar: '/images/avatar.png',
  email: 'react@example.com',
  location: '深圳',
  pending: {}
}

/**
 * 用户资料组件
 * 展示表单字段的独立乐观更新
 */
export default function UserProfile() {
  const [profile, setProfile] = useState<Profile>(initialProfile)

  // 使用 useOptimistic 管理乐观更新状态
  const [optimisticProfile, addOptimisticProfile] = useOptimistic(
    profile,
    (state: Profile, update: Partial<Profile> & { field: string }): Profile => ({
      ...state,
      ...update,
      pending: {
        ...state.pending,
        [update.field]: true
      }
    })
  )

  // 模拟 API 调用
  const updateField = async (field: string, value: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { [field]: value }
  }

  // 处理字段更新
  const handleUpdate = async (field: string, value: string) => {
    // 使用 startTransition 包装乐观更新
    startTransition(() => {
      // 添加乐观更新
      addOptimisticProfile({ [field]: value, field })
    })

    try {
      // 实际 API 调用
      await updateField(field, value)
      setProfile(prev => ({
        ...prev,
        [field]: value,
        pending: {
          ...prev.pending,
          [field]: false
        }
      }))
    } catch (error) {
      console.error(`Failed to update ${field}:`, error)
      // 错误时回滚到原始状态
      setProfile(prev => ({
        ...prev,
        pending: {
          ...prev.pending,
          [field]: false
        }
      }))
    }
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={optimisticProfile.avatar}
          alt="用户头像"
          className="avatar"
        />
        <div className="profile-info">
          <h3>{optimisticProfile.name}</h3>
          <p>{optimisticProfile.location}</p>
        </div>
      </div>

      <div className="profile-fields">
        <div className="field">
          <label>姓名:</label>
          <div className="field-content">
            <input
              type="text"
              value={optimisticProfile.name}
              onChange={e => handleUpdate('name', e.target.value)}
            />
            {optimisticProfile.pending?.name && (
              <span className="pending-indicator">更新中...</span>
            )}
          </div>
        </div>

        <div className="field">
          <label>简介:</label>
          <div className="field-content">
            <textarea
              value={optimisticProfile.bio}
              onChange={e => handleUpdate('bio', e.target.value)}
            />
            {optimisticProfile.pending?.bio && (
              <span className="pending-indicator">更新中...</span>
            )}
          </div>
        </div>

        <div className="field">
          <label>邮箱:</label>
          <div className="field-content">
            <input
              type="email"
              value={optimisticProfile.email}
              onChange={e => handleUpdate('email', e.target.value)}
            />
            {optimisticProfile.pending?.email && (
              <span className="pending-indicator">更新中...</span>
            )}
          </div>
        </div>

        <div className="field">
          <label>地址:</label>
          <div className="field-content">
            <input
              type="text"
              value={optimisticProfile.location}
              onChange={e => handleUpdate('location', e.target.value)}
            />
            {optimisticProfile.pending?.location && (
              <span className="pending-indicator">更新中...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
