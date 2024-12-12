import { ChangeEvent, KeyboardEvent, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField } from '@mui/material';

import { useChat } from '@/contexts/ChatContext';

/**
 * 输入组件
 * - 多行文本输入
 * - 发送按钮
 * - 支持快捷键发送
 */
export default function Input() {
    const [message, setMessage] = useState('');
    const { sendMessage, isLoading, apiKey } = useChat();

    const handleSubmit = async () => {
        if (message.trim() && !isLoading) {
            await sendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                // maxWidth: '48rem',
                mx: 'auto',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    bgcolor: 'var(--input-bg)',
                    borderRadius: 1.5,
                    border: theme => `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                    '&:hover': {
                        borderColor: theme => theme.palette.divider,
                    },
                    '&:focus-within': {
                        borderColor: theme => theme.palette.primary.main,
                        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                    },
                }}
            >
                <TextField
                    multiline
                    maxRows={8}
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder={apiKey ? '发送消息...' : '请先设置 API 密钥'}
                    disabled={!apiKey || isLoading}
                    fullWidth
                    variant="standard"
                    sx={{
                        '& .MuiInputBase-root': {
                            p: 1.5,
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            '&:before, &:after': {
                                display: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'text.primary',
                            '&::placeholder': {
                                color: 'text.secondary',
                                opacity: 0.8,
                            },
                        },
                    }}
                />
                <IconButton
                    onClick={handleSubmit}
                    disabled={!message.trim() || !apiKey || isLoading}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        bgcolor: message.trim() ? '#19C37D' : 'transparent',
                        color: message.trim()
                            ? 'white'
                            : 'rgba(255,255,255,0.4)',
                        '&:hover': {
                            bgcolor: message.trim()
                                ? '#1a8f5f'
                                : 'rgba(255,255,255,0.1)',
                        },
                        transition: 'all 0.2s ease',
                        p: 1,
                    }}
                >
                    <SendIcon fontSize="small" />
                </IconButton>
            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    mb: 2,
                }}
            >
                ChatGPT 也可能会犯错。请核查重要信息。
            </Box>
        </Box>
    );
}
