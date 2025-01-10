import { useOptimistic } from 'react'
import { useState, startTransition } from 'react'

type Message = {
  id: number
  text: string
  likes: number
  pending?: boolean
}

// 模拟初始消息数据
const initialMessages: Message[] = [
  { id: 1, text: '你好，React 19!', likes: 5 },
  { id: 2, text: '乐观更新真好用', likes: 3 },
  { id: 3, text: '让交互更流畅', likes: 7 }
]

/**
 * useOptimistic Hook Demo
 * 展示乐观更新的使用场景
 */
export default function UseOptimisticDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  // 使用 useOptimistic 管理乐观更新状态
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: Message): Message[] =>
      state.map(msg =>
        msg.id === newMessage.id
          ? { ...newMessage, pending: true }
          : msg
      )
  )

  // 模拟 API 调用
  const updateLikes = async (message: Message) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { ...message, likes: message.likes + 1 }
  }

  // 处理点赞
  const handleLike = async (message: Message) => {
    const newMessage = { ...message, likes: message.likes + 1 }

    // 使用 startTransition 包装乐观更新
    startTransition(() => {
      addOptimisticMessage(newMessage)
    })

    try {
      const updatedMessage = await updateLikes(message)
      setMessages(messages.map(msg =>
        msg.id === message.id ? updatedMessage : msg
      ))
    } catch (error) {
      console.error('Failed to update likes:', error)
      // 错误时回滚到原始状态
      setMessages(messages)
    }
  }

  // 添加新消息
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.querySelector('input')
    if (!input?.value.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: input.value,
      likes: 0
    }

    // 使用 startTransition 包装乐观更新
    startTransition(() => {
      addOptimisticMessage({ ...newMessage, pending: true })
    })

    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessages([...messages, newMessage])
      form.reset()
    } catch (error) {
      console.error('Failed to add message:', error)
    }
  }

  return (
    <div className="optimistic-demo">
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="输入新消息..."
          className="message-input"
        />
        <button type="submit">发送</button>
      </form>

      <div className="messages">
        {optimisticMessages.map(message => (
          <div
            key={message.id}
            className={`message ${message.pending ? 'pending' : ''}`}
          >
            <p className="message-text">{message.text}</p>
            <div className="message-actions">
              <button
                onClick={() => handleLike(message)}
                disabled={message.pending}
                className="like-button"
              >
                👍 {message.likes}
              </button>
              {message.pending && (
                <span className="pending-indicator">更新中...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
