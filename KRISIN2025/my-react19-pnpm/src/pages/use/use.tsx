import { createContext, Suspense, use, useState } from 'react';

// 创建一个 Context 用于演示
const ThemeContext = createContext('light');

// 模拟异步数据获取
async function fetchComments(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ['Great post!', 'Thanks for sharing!', 'Very helpful!'];
}

// 评论组件 - 使用 use 读取 Promise
function Comments({ commentsPromise }: { commentsPromise: Promise<string[]> }) {
    // use 会 suspend 直到 Promise resolve
    const comments = use(commentsPromise);

    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
            ))}
        </ul>
    );
}

// 主题化标题组件 - 使用 use 读取 Context
function ThemedHeading({ children }: { children?: React.ReactNode }) {
    // 提前返回的情况
    if (!children) {
        return null;
    }

    // 在条件语句后使用 Context - 这在 useContext 中是不允许的
    const theme = use(ThemeContext);

    return (
        <h2
            style={{
                color: theme === 'dark' ? '#fff' : '#000',
                backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
                padding: '1rem',
            }}
        >
            {children}
        </h2>
    );
}

// 主组件
export default function UseDemo() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 创建 Promise - 注意：在实际应用中应该使用缓存
    const commentsPromise = fetchComments();

    return (
        <div>
            <h1>use Demo</h1>

            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() =>
                        setTheme(t => (t === 'light' ? 'dark' : 'light'))
                    }
                >
                    Toggle Theme
                </button>
            </div>

            <ThemeContext.Provider value={theme}>
                <ThemedHeading>Conditional Context Usage</ThemedHeading>
                <ThemedHeading>{null}</ThemedHeading>

                <div style={{ marginTop: '2rem' }}>
                    <h3>Comments (with Suspense):</h3>
                    <Suspense fallback={<div>Loading comments...</div>}>
                        <Comments commentsPromise={commentsPromise} />
                    </Suspense>
                </div>
            </ThemeContext.Provider>

            <div style={{ marginTop: '2rem' }}>
                <pre>{JSON.stringify({ currentTheme: theme }, null, 2)}</pre>
            </div>
        </div>
    );
}
