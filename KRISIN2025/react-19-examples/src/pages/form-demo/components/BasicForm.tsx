import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  age: number
  gender: string
  interests: string[]
  bio: string
  newsletter: boolean
}

/**
 * 基础表单控件
 * 展示各种表单控件的使用
 */
export default function BasicForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [result, setResult] = useState<FormData | null>(null)

  const onSubmit = (data: FormData) => {
    setResult(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="basic-form">
      {/* 文本输入 */}
      <div className="form-group">
        <label htmlFor="name">姓名:</label>
        <input
          {...register('name', { required: '姓名是必填的' })}
          type="text"
          id="name"
          placeholder="请输入姓名"
        />
        {errors.name && (
          <span className="error">{errors.name.message}</span>
        )}
      </div>

      {/* 邮箱输入 */}
      <div className="form-group">
        <label htmlFor="email">邮箱:</label>
        <input
          {...register('email', {
            required: '邮箱是必填的',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '请输入有效的邮箱地址'
            }
          })}
          type="email"
          id="email"
          placeholder="请输入邮箱"
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      {/* 数字输入 */}
      <div className="form-group">
        <label htmlFor="age">年龄:</label>
        <input
          {...register('age', {
            required: '年龄是必填的',
            min: { value: 18, message: '年龄必须大于18岁' },
            max: { value: 100, message: '年龄必须小于100岁' }
          })}
          type="number"
          id="age"
          placeholder="请输入年龄"
        />
        {errors.age && (
          <span className="error">{errors.age.message}</span>
        )}
      </div>

      {/* 单选框 */}
      <div className="form-group">
        <label>性别:</label>
        <div className="radio-group">
          <label>
            <input
              {...register('gender', { required: '请选择性别' })}
              type="radio"
              value="male"
            />
            男
          </label>
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="female"
            />
            女
          </label>
          <label>
            <input
              {...register('gender')}
              type="radio"
              value="other"
            />
            其他
          </label>
        </div>
        {errors.gender && (
          <span className="error">{errors.gender.message}</span>
        )}
      </div>

      {/* 复选框组 */}
      <div className="form-group">
        <label>兴趣爱好:</label>
        <div className="checkbox-group">
          <label>
            <input
              {...register('interests')}
              type="checkbox"
              value="reading"
            />
            阅读
          </label>
          <label>
            <input
              {...register('interests')}
              type="checkbox"
              value="sports"
            />
            运动
          </label>
          <label>
            <input
              {...register('interests')}
              type="checkbox"
              value="music"
            />
            音乐
          </label>
          <label>
            <input
              {...register('interests')}
              type="checkbox"
              value="travel"
            />
            旅行
          </label>
        </div>
      </div>

      {/* 文本域 */}
      <div className="form-group">
        <label htmlFor="bio">个人简介:</label>
        <textarea
          {...register('bio')}
          id="bio"
          placeholder="请输入个人简介"
        />
      </div>

      {/* 单个复选框 */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            {...register('newsletter')}
            type="checkbox"
          />
          订阅新闻通讯
        </label>
      </div>

      <button type="submit">提交</button>

      {/* 结果展示 */}
      {result && (
        <div className="result">
          <h3>表单数据:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}
