import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'

// 表单状态类型
type FormState = {
  success?: boolean
  error?: string
  data?: any
}

// 服务器动作
async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server'

  // 模拟服务器验证和处理
  await new Promise(resolve => setTimeout(resolve, 1000))

  const email = formData.get('email')
  const password = formData.get('password')
  const remember = formData.get('remember')

  // 验证邮箱
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
    return { error: '请输入有效的邮箱地址' }
  }

  // 验证密码
  if (!password || password.toString().length < 6) {
    return { error: '密码至少需要6个字符' }
  }

  // 模拟成功响应
  return {
    success: true,
    data: { email, remember: !!remember }
  }
}

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '登录中...' : '登录'}
    </button>
  )
}

/**
 * useFormState Hook Demo
 * 展示新的表单状态管理方式
 */
export default function UseFormStateDemo() {
  const [formState, formAction] = useFormState(submitForm, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="form-state-demo">
      <form action={formAction} className="login-form">
        <div className="form-group">
          <label htmlFor="email">邮箱:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="请输入邮箱"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              placeholder="请输入密码"
              className="form-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="remember"
              className="form-checkbox"
            />
            记住我
          </label>
        </div>

        {formState.error && (
          <div className="error-message">
            {formState.error}
          </div>
        )}

        {formState.success && (
          <div className="success-message">
            登录成功！
            <pre>{JSON.stringify(formState.data, null, 2)}</pre>
          </div>
        )}

        <div className="form-actions">
          <SubmitButton />
        </div>
      </form>

      <div className="form-info">
        <h3>useFormState 特性:</h3>
        <ul>
          <li>服务器端表单处理</li>
          <li>内置加载状态</li>
          <li>表单验证</li>
          <li>错误处理</li>
        </ul>
      </div>
    </div>
  )
}
