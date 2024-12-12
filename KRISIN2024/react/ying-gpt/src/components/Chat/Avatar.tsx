import { Box } from '@mui/material';

import chatGPTLogo from '@/assets/chatGPT.png'; // 建议把图片放在 assets 目录
import { Role } from '@/types';

interface AvatarProps {
    role: Role;
}

export default function Avatar({ role }: AvatarProps) {
    const isUser = role === 'user';

    return (
        <Box
            sx={{
                width: 30,
                height: 30,
                borderRadius: '4px',
                flexShrink: 0,
                bgcolor: isUser ? 'white' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: theme =>
                    isUser ? `1px solid ${theme.palette.divider}` : 'none',
            }}
        >
            {isUser ? (
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            ) : (
                <img
                    src={chatGPTLogo}
                    alt="ChatGPT"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            )}
        </Box>
    );
}
