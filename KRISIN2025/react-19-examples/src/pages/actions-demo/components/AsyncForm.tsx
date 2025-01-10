import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'

// 异步表单处理函数
async function handleAsyncSubmit(prevState: any, formData: FormData) {
  'use server'

  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 1500))

  const title = formData.get('title')
  const content = formData.get('content')

  if (!title || !content) {
    return { error: '标题和内容都是必填的' }
  }

  return {
    success: true,
    data: { title, content },
    timestamp: new Date().toISOString()
  }
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '发布中...' : '发布文章'}
    </button>
  )
}

/**
 * 异步表单组件
 * 展示异步表单提交和状态处理
 */
export default function AsyncForm() {
  const [state, formAction] = useFormState(handleAsyncSubmit, null)
  const [preview, setPreview] = useState('')

  return (
    <form action={formAction} className="async-form">
      <div className="form-group">
        <label htmlFor="title">文章标题:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="请输入标题"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">文章内容:</label>
        <textarea
          id="content"
          name="content"
          required
          placeholder="请输入内容"
          onChange={e => setPreview(e.target.value)}
        />
      </div>

      {preview && (
        <div className="preview">
          <h4>预览:</h4>
          <div className="preview-content">{preview}</div>
        </div>
      )}

      {state?.error && (
        <div className="error-message">{state.error}</div>
      )}

      {state?.success && (
        <div className="success-message">
          发布成功！
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
          <div className="timestamp">发布时间: {state.timestamp}</div>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
