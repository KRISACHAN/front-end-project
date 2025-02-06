import { useOptimistic, useState } from 'react';

// 模拟 API 调用
async function updateName(newName: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return newName;
}

export default function UseOptimisticDemo() {
    const [currentName, setCurrentName] = useState('John');
    const [optimisticName, setOptimisticName] = useOptimistic(currentName);

    // 处理表单提交
    async function handleSubmit(formData: FormData) {
        const newName = formData.get('name') as string;

        // 立即更新优化状态
        setOptimisticName(newName);

        // 等待实际 API 调用
        const updatedName = await updateName(newName);
        setCurrentName(updatedName);
    }

    return (
        <div>
            <h1>useOptimistic Demo</h1>

            <div style={{ marginBottom: '1rem' }}>
                <p>Current name: {currentName}</p>
                <p>Displayed name: {optimisticName}</p>
            </div>

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
                        name="name"
                        placeholder="Enter new name"
                        disabled={currentName !== optimisticName}
                    />
                    <button
                        type="submit"
                        disabled={currentName !== optimisticName}
                    >
                        Update Name
                    </button>
                </div>
            </form>

            <div style={{ marginTop: '1rem' }}>
                <pre>
                    {JSON.stringify(
                        {
                            currentName,
                            optimisticName,
                            isUpdating: currentName !== optimisticName,
                        },
                        null,
                        2,
                    )}
                </pre>
            </div>
        </div>
    );
}
