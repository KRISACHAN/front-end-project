import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 定义验证模式
const validationSchema = z.object({
  username: z.string()
    .min(3, '用户名至少需要3个字符')
    .max(20, '用户名不能超过20个字符'),
  password: z.string()
    .min(8, '密码至少需要8个字符')
    .regex(/[A-Z]/, '密码必须包含至少一个大写字母')
    .regex(/[a-z]/, '密码必须包含至少一个小写字母')
    .regex(/[0-9]/, '密码必须包含至少一个数字'),
  confirmPassword: z.string(),
  phone: z.string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "密码不匹配",
  path: ["confirmPassword"],
})

type ValidationFormData = z.infer<typeof validationSchema>

/**
 * 表单验证组件
 * 展示复杂的表单验证逻辑
 */
export default function ValidationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema)
  })

  const password = watch('password')

  const onSubmit = async (data: ValidationFormData) => {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="validation-form">
      <div className="form-group">
        <label htmlFor="username">用户名:</label>
        <input
          {...register('username')}
          type="text"
          id="username"
          placeholder="请输入用户名"
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">密码:</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          placeholder="请输入密码"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">确认密码:</label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          placeholder="请再次输入密码"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">手机号码:</label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          placeholder="请输入手机号码"
        />
        {errors.phone && (
          <span className="error">{errors.phone.message}</span>
        )}
      </div>

      {/* 密码强度指示器 */}
      {password && (
        <div className="password-strength">
          <h4>密码强度检查:</h4>
          <ul>
            <li className={password.length >= 8 ? 'valid' : 'invalid'}>
              至少8个字符
            </li>
            <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
              包含大写字母
            </li>
            <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
              包含小写字母
            </li>
            <li className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>
              包含数字
            </li>
          </ul>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '注册'}
      </button>
    </form>
  )
}
