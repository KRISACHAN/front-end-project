import { useFormState, useFormStatus } from 'react-dom'

// 表单处理函数
async function handleSubmit(prevState: any, formData: FormData) {
  'use server'

  const name = formData.get('name')
  const email = formData.get('email')

  // 模拟服务器验证
  if (!name || !email) {
    return { error: '所有字段都是必填的' }
  }

  // 模拟成功响应
  return { success: true, data: { name, email } }
}

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

/**
 * 基础表单组件
 * 展示 React 19 中的表单处理特性
 */
export default function SimpleForm() {
  const [state, formAction] = useFormState(handleSubmit, null)

  return (
    <form action={formAction} className="simple-form">
      <div className="form-group">
        <label htmlFor="name">姓名:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="请输入姓名"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">邮箱:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="请输入邮箱"
        />
      </div>

      {state?.error && (
        <div className="error-message">{state.error}</div>
      )}

      {state?.success && (
        <div className="success-message">
          提交成功！
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
