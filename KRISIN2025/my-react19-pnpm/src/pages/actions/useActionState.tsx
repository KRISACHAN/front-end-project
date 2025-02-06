import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// 提交按钮组件
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Updating...' : 'Update'}
        </button>
    );
}

export default function UseActionStateDemo() {
    // 使用 useActionState 处理计数器
    const [count, formAction] = useActionState(
        async (prevState: number) => {
            // 模拟异步操作
            await new Promise(resolve => setTimeout(resolve, 1000));
            return prevState + 1;
        },
        0, // 初始值为 0
    );

    return (
        <div>
            <h1>useActionState Demo</h1>

            <form action={formAction}>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    <div>Count: {count}</div>
                    <SubmitButton />
                </div>
            </form>

            <div style={{ marginTop: '1rem' }}>
                <pre>{JSON.stringify({ count }, null, 2)}</pre>
            </div>
        </div>
    );
}
