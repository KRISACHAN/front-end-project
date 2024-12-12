import { useEffect, useState } from 'react';

/**
 * 打字机效果 Hook
 * @param text - 需要显示的文本
 * @param speed - 打字速度（毫秒）
 * @returns 当前显示的文本和打字状态
 */
export function useTypewriter(text: string, speed: number = 20) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!text) return;

        setIsTyping(true);
        setDisplayText('');

        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(prev => prev + text.charAt(index));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return { displayText, isTyping };
}
