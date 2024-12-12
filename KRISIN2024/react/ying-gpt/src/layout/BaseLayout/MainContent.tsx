import { Box } from '@mui/material';

import Chat from '@/components/Chat/Chat';
import Input from '@/components/Input/Input';

/**
 * 主内容区组件
 * - 聊天消息列表
 * - 输入框
 * - 响应式布局
 */
export default function MainContent() {
    return (
        <Box
            id="main-content"
            component="main"
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
                bgcolor: 'var(--main-bg)',
                transition: 'margin-left 0.3s ease',
                // marginLeft: {
                //     xs: 0,
                //     md: open ? 'var(--sidebar-width)' : 0,
                // },
                margin: '0 auto',
                maxWidth: 'var(--max-content-width)',
            }}
        >
            {/* 聊天消息列表 */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Chat />
            </Box>

            {/* 输入区域 */}
            <Box
                sx={{
                    p: 2,
                    background:
                        'linear-gradient(180deg, rgba(53,55,64,0), var(--main-bg) 58.85%)',
                }}
            >
                <Input />
            </Box>
        </Box>
    );
}
