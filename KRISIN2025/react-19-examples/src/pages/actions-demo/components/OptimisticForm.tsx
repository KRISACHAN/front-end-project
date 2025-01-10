import { useOptimistic } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react'

// 评论列表类型
type Comment = {
  id: number
  text: string
  timestamp: string
}

// 初始评论数据
const initialComments: Comment[] = [
  {
    id: 1,
    text: '这是第一条评论',
    timestamp: '2024-03-15 10:00:00'
  },
  {
    id: 2,
    text: '这是第二条评论',
    timestamp: '2024-03-15 10:05:00'
  }
]

// 评论提交处理函数
async function handleAddComment(prevState: any, formData: FormData) {
  'use server'

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2000))

  const text = formData.get('comment')
  if (!text) return { error: '评论内容不能为空' }

  const newComment: Comment = {
    id: Date.now(),
    text: text as string,
    timestamp: new Date().toISOString()
  }

  return {
    success: true,
    comment: newComment
  }
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '发送中...' : '发送评论'}
    </button>
  )
}

/**
 * 乐观更新表单组件
 * 展示乐观更新特性
 */
export default function OptimisticForm() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [optimisticComments, addOptimisticComment] = useOptimistic<Comment[]>(
    comments,
    (state, newComment: Comment) => [...state, newComment]
  )

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const result = await handleAddComment(prevState, formData)
    if (result.success) {
      setComments(prev => [...prev, result.comment])
    }
    return result
  }, null)

  const handleSubmit = (formData: FormData) => {
    // 添加乐观更新
    const optimisticComment: Comment = {
      id: Date.now(),
      text: formData.get('comment') as string,
      timestamp: '正在发送...'
    }
    addOptimisticComment(optimisticComment)
    formAction(formData)
  }

  return (
    <div className="optimistic-form">
      <div className="comments-list">
        {optimisticComments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <span className="timestamp">{comment.timestamp}</span>
          </div>
        ))}
      </div>

      <form action={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="comment">添加评论:</label>
          <textarea
            id="comment"
            name="comment"
            required
            placeholder="请输入评论内容"
          />
        </div>

        {state?.error && (
          <div className="error-message">{state.error}</div>
        )}

        <SubmitButton />
      </form>
    </div>
  )
}
