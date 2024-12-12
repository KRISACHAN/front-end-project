import { useEffect, useRef } from 'react';

import { Alert, Box } from '@mui/material';

import { useChat } from '@/contexts/ChatContext';

import MessageBubble from './MessageBubble';

/**
 * 聊天组件
 * - 显示消息列表
 * - 处理自动滚动
 * - 显示加载状态和错误提示
 */
export default function Chat() {
    const { messages, error, apiKey, isLoading } = useChat();
    const bottomRef = useRef<HTMLDivElement>(null);

    // 新消息时自动滚动到底部
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                mx: 'auto',
                width: '100%',
                py: 2,
            }}
        >
            {!apiKey && (
                <Alert severity="info" sx={{ mx: 2, mb: 2 }}>
                    请设置你的 OpenRouter API 密钥以开始对话
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
                    {error}
                </Alert>
            )}

            {messages.map(message => (
                <MessageBubble
                    key={message.id}
                    content={message.content}
                    role={message.role}
                />
            ))}

            {isLoading && <MessageBubble content="" role="assistant" />}

            <div ref={bottomRef} />
        </Box>
    );
}
