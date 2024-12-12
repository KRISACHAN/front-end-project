import { createContext, ReactNode, useContext, useState } from 'react';

import { sendMessage } from '@/utils/api';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
}

interface ChatContextType {
    messages: Message[];
    apiKey: string;
    isLoading: boolean;
    error: string | null;
    setApiKey: (key: string) => void;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

/**
 * 聊天上下文管理器
 * @param children - React 子组件
 * @returns 提供聊天功能的上下文组件
 */
export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 添加新消息到聊天记录
     * @param content - 消息内容
     * @param role - 消息发送者角色
     */
    const addMessage = (content: string, role: 'user' | 'assistant') => {
        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            role,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    };

    /**
     * 处理消息发送逻辑
     * @param content - 用户输入的消息内容
     */
    const handleSendMessage = async (content: string) => {
        if (!apiKey) {
            setError('Please set your OpenRouter API key first');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // 添加用户消息
            addMessage(content, 'user');

            // 准备发送给API的消息历史
            const messageHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content,
                id: msg.id,
            }));
            messageHistory.push({
                role: 'user' as const,
                content,
                id: Date.now().toString(),
            });

            // 发送请求
            const response = await sendMessage(messageHistory, apiKey);

            // 添加AI回复
            addMessage(response, 'assistant');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        setError(null);
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                apiKey,
                isLoading,
                error,
                setApiKey,
                sendMessage: handleSendMessage,
                clearMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
