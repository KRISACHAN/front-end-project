import { API_CONFIG } from '@/config/api';
import { ApiResponse, Message } from '@/types';

/**
 * 发送消息到 OpenRouter API
 * @param messages - 消息历史记录
 * @param apiKey - OpenRouter API 密钥
 * @returns AI 助手的回复内容
 * @throws {Error} API 请求失败时抛出错误
 */
export async function sendMessage(messages: Message[], apiKey: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: API_CONFIG.MODEL,
            messages,
            max_tokens: API_CONFIG.MAX_TOKENS,
            temperature: API_CONFIG.TEMPERATURE,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `API error: ${response.status}`);
    }

    const data = (await response.json()) as ApiResponse;
    return data.choices[0].message.content;
}
