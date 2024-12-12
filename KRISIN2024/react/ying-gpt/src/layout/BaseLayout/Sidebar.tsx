import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import ApiKeyInput from '@/components/Settings/ApiKeyInput';
import { useChat } from '@/contexts/ChatContext';
import { useTheme as useAppTheme } from '@/contexts/ThemeContext';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

/**
 * 侧边栏组件
 * - 新建对话按钮
 * - API 密钥设置
 * - 响应式设计（移动端抽屉）
 */
export default function Sidebar({ open, onClose }: SidebarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { clearMessages } = useChat();
    const { isDarkMode, toggleTheme } = useAppTheme();

    const handleNewChat = () => {
        clearMessages();
        if (isMobile) onClose();
    };

    const sidebarContent = (
        <Box
            sx={{
                width: 'var(--sidebar-width)',
                height: '100%',
                bgcolor: 'var(--sidebar-bg)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            {/* Top Section */}
            <Box sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleNewChat}
                    fullWidth
                    sx={{
                        color: 'text.primary',
                        borderColor: theme => theme.palette.divider,
                        textTransform: 'none',
                        py: 1,
                        '&:hover': {
                            borderColor: 'text.primary',
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    新建对话
                </Button>
            </Box>

            {/* Mobile Close Button */}
            {isMobile && (
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'text.primary',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            {/* Chat History Section (placeholder) */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    borderTop: theme => `1px solid ${theme.palette.divider}`,
                    mt: 2,
                }}
            />

            {/* Bottom Section */}
            <Box
                sx={{
                    p: 2,
                    borderTop: theme => `1px solid ${theme.palette.divider}`,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={
                        isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />
                    }
                    onClick={toggleTheme}
                    fullWidth
                    sx={{
                        color: 'text.primary',
                        borderColor: theme => theme.palette.divider,
                        textTransform: 'none',
                        py: 1,
                        '&:hover': {
                            borderColor: 'text.primary',
                            bgcolor: 'action.hover',
                        },
                    }}
                >
                    {isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
                </Button>
            </Box>

            <Box sx={{ p: 2 }}>
                <ApiKeyInput />
            </Box>
        </Box>
    );

    return isMobile ? (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: 'var(--sidebar-bg)',
                    width: 'var(--sidebar-width)',
                },
            }}
        >
            {sidebarContent}
        </Drawer>
    ) : (
        <Box
            component="nav"
            sx={{
                width: open ? 'var(--sidebar-width)' : 0,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                borderRight: theme => `1px solid ${theme.palette.divider}`,
            }}
        >
            {open && sidebarContent}
        </Box>
    );
}
