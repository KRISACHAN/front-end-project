import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

import { useChat } from '@/contexts/ChatContext';

/**
 * API 密钥输入组件
 * - 密钥输入框
 * - 显示/隐藏密钥切换
 * - 保存/更新密钥按钮
 */
export default function ApiKeyInput() {
    const { apiKey, setApiKey } = useChat();
    const [tempKey, setTempKey] = useState(apiKey);
    const [showKey, setShowKey] = useState(false);

    const handleSubmit = () => {
        setApiKey(tempKey.trim());
    };

    return (
        <Box>
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: 'text.secondary' }}
            >
                OpenRouter API 密钥
            </Typography>

            {!apiKey && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    请输入你的 OpenRouter API 密钥以开始对话
                </Alert>
            )}

            <TextField
                fullWidth
                type={showKey ? 'text' : 'password'}
                value={tempKey}
                onChange={e => setTempKey(e.target.value)}
                placeholder="sk-or-..."
                sx={{ mb: 1 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowKey(!showKey)}
                                edge="end"
                            >
                                {showKey ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!tempKey.trim() || tempKey.trim() === apiKey}
                fullWidth
            >
                {apiKey ? '更新密钥' : '保存密钥'}
            </Button>
        </Box>
    );
}
