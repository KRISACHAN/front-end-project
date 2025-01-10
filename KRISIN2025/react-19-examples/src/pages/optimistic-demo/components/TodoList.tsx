import { useOptimistic } from 'react'
import { useState, startTransition } from 'react'

type Todo = {
  id: number
  text: string
  completed: boolean
  pending?: boolean
}

// 模拟初始数据
const initialTodos: Todo[] = [
  { id: 1, text: '学习 React 19', completed: false },
  { id: 2, text: '实践乐观更新', completed: false },
  { id: 3, text: '掌握 Hooks', completed: true }
]

/**
 * 待办事项列表组件
 * 展示基本的乐观更新模式
 */
export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  // 使用 useOptimistic 来管理乐观更新状态
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: Todo): Todo[] =>
      state.map(todo =>
        todo.id === newTodo.id
          ? { ...newTodo, pending: true }
          : todo
      )
  )

  // 模拟 API 调用
  const updateTodo = async (todo: Todo) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return todo
  }

  // 处理待办事项切换
  const handleToggle = async (todo: Todo) => {
    const newTodo = { ...todo, completed: !todo.completed }

    // 使用 startTransition 包装乐观更新
    startTransition(() => {
      addOptimisticTodo(newTodo)
    })

    try {
      await updateTodo(newTodo)
      setTodos(todos.map(t =>
        t.id === todo.id ? newTodo : t
      ))
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  // 添加新待办事项
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.querySelector('input')
    if (!input?.value.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input.value,
      completed: false
    }

    // 使用 startTransition 包装乐观更新
    startTransition(() => {
      addOptimisticTodo({ ...newTodo, pending: true })
    })

    try {
      await updateTodo(newTodo)
      setTodos([...todos, newTodo])
      form.reset()
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="添加新待办事项..."
          className="todo-input"
        />
        <button type="submit">添加</button>
      </form>

      <ul className="todos">
        {optimisticTodos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''} ${
              todo.pending ? 'pending' : ''
            }`}
            onClick={() => handleToggle(todo)}
          >
            <span className="todo-checkbox">
              {todo.completed ? '✓' : '○'}
            </span>
            <span className="todo-text">{todo.text}</span>
            {todo.pending && (
              <span className="pending-indicator">更新中...</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
