// 角色类型定义
export type Role = 'user' | 'assistant';

// 消息类型定义
export interface Message {
    id: string;
    content: string;
    role: Role;
}

// API 响应类型定义
export interface ApiResponse {
    id: string;
    choices: {
        message: {
            content: string;
            role: Role;
        };
    }[];
}
