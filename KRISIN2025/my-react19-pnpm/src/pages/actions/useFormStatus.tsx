import { useState } from 'react';
import { useFormStatus } from 'react-dom';

// 提交按钮组件，展示所有 FormStatus 字段
function FormStatusDisplay() {
    const { pending, data, method, action } = useFormStatus();

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>Form Status:</h3>
            <pre>
                {JSON.stringify(
                    {
                        pending,
                        data: data ? Object.fromEntries(data.entries()) : null,
                        method,
                        action:
                            typeof action === 'function' ? 'function' : action,
                    },
                    null,
                    2,
                )}
            </pre>
        </div>
    );
}

// 提交按钮组件
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    );
}

export default function UseFormStatusDemo() {
    const [messages, setMessages] = useState<string[]>([]);

    // Form Action 处理函数
    async function handleSubmit(formData: FormData) {
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 1000));
        const message = formData.get('message') as string;
        setMessages(prev => [...prev, message]);
    }

    return (
        <div>
            <h1>useFormStatus Demo</h1>

            <form action={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <input
                        type="text"
                        name="message"
                        placeholder="Enter a message"
                        required
                    />
                    <SubmitButton />
                </div>

                {/* 展示所有 FormStatus 字段 */}
                <FormStatusDisplay />
            </form>

            {/* 消息列表 */}
            <div style={{ marginTop: '1rem' }}>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
