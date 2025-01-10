import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'

type Education = {
  school: string
  degree: string
  year: number
}

type Experience = {
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
}

type DynamicFormData = {
  education: Education[]
  experience: Experience[]
}

/**
 * 动态表单组件
 * 展示动态添加/删除表单字段
 */
export default function DynamicForm() {
  const { register, control, handleSubmit, watch, setValue } = useForm<DynamicFormData>({
    defaultValues: {
      education: [{ school: '', degree: '', year: new Date().getFullYear() }],
      experience: [{ company: '', position: '', startDate: '', endDate: '', current: false }]
    }
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation
  } = useFieldArray({
    control,
    name: 'education'
  })

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: 'experience'
  })

  const [result, setResult] = useState<DynamicFormData | null>(null)

  const onSubmit = (data: DynamicFormData) => {
    setResult(data)
  }

  // 监听 current 字段来处理结束日期
  const watchExperienceFields = watch('experience')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form">
      {/* 教育经历 */}
      <div className="form-section">
        <h3>教育经历</h3>
        {educationFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <div className="form-group">
              <label>学校:</label>
              <input
                {...register(`education.${index}.school` as const)}
                placeholder="请输入学校名称"
              />
            </div>
            <div className="form-group">
              <label>学位:</label>
              <input
                {...register(`education.${index}.degree` as const)}
                placeholder="请输入学位"
              />
            </div>
            <div className="form-group">
              <label>年份:</label>
              <input
                type="number"
                {...register(`education.${index}.year` as const)}
                placeholder="请输入年份"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="remove-btn"
              >
                删除
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEducation({ school: '', degree: '', year: new Date().getFullYear() })}
          className="add-btn"
        >
          添加教育经历
        </button>
      </div>

      {/* 工作经验 */}
      <div className="form-section">
        <h3>工作经验</h3>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="dynamic-field">
            <div className="form-group">
              <label>公司:</label>
              <input
                {...register(`experience.${index}.company` as const)}
                placeholder="请输入公司名称"
              />
            </div>
            <div className="form-group">
              <label>职位:</label>
              <input
                {...register(`experience.${index}.position` as const)}
                placeholder="请输入职位"
              />
            </div>
            <div className="form-group">
              <label>开始日期:</label>
              <input
                type="date"
                {...register(`experience.${index}.startDate` as const)}
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register(`experience.${index}.current` as const)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue(`experience.${index}.endDate`, '')
                    }
                  }}
                />
                目前在职
              </label>
            </div>
            {!watchExperienceFields[index]?.current && (
              <div className="form-group">
                <label>结束日期:</label>
                <input
                  type="date"
                  {...register(`experience.${index}.endDate` as const)}
                />
              </div>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="remove-btn"
              >
                删除
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendExperience({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false
          })}
          className="add-btn"
        >
          添加工作经验
        </button>
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
