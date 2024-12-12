import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    materialDark,
    materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import remarkGfm from 'remark-gfm';

import { useChat } from '@/contexts/ChatContext';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Role } from '@/types';

import Avatar from './Avatar';
import LoadingDots from './LoadingDots';

interface MessageBubbleProps {
    content: string;
    role: Role;
}

interface CodeProps {
    inline?: boolean;
    className?: string;
    children: string | string[];
}

/**
 * 消息气泡组件
 * - 用户消息和 AI 回复使用不同样式
 * - 支持 Markdown 渲染
 * - 代码块语法高亮
 * - 代码复制功能
 */
export default function MessageBubble({ content, role }: MessageBubbleProps) {
    const isUser = role === 'user';
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const { displayText, isTyping } = useTypewriter(content, 20);
    const { isLoading } = useChat();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const displayContent = isUser ? content : displayText;

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: isUser
                    ? 'transparent'
                    : theme.palette.mode === 'light'
                      ? 'grey.50'
                      : 'grey.900',
                py: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box
                sx={{
                    maxWidth: 'var(--max-content-width)',
                    mx: 'auto',
                    px: 2,
                    width: '100%',
                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex-start',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                }}
            >
                <Avatar role={role} />
                <Box sx={{ flex: 1 }}>
                    {!isUser && isLoading && !content ? (
                        <LoadingDots />
                    ) : (
                        <Typography
                            component="div"
                            sx={{
                                color: 'text.primary',
                                textAlign: isUser ? 'right' : 'left',
                                '& p': {
                                    m: 0,
                                    lineHeight: 1.75,
                                    // textAlign: 'left',
                                },
                                '& pre': {
                                    position: 'relative',
                                    m: 0,
                                    '& .copy-button': {
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                    },
                                    '&:hover .copy-button': {
                                        opacity: 1,
                                    },
                                },
                                '& code': {
                                    bgcolor: theme =>
                                        theme.palette.mode === 'light'
                                            ? 'grey.100'
                                            : 'grey.800',
                                    p: 0.5,
                                    borderRadius: 0.5,
                                    fontFamily: 'monospace',
                                },
                                '& a': {
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                },
                                '& ul, & ol': {
                                    pl: 3,
                                    mb: 0,
                                },
                                '& li': {
                                    mb: 0.5,
                                },
                                '& table': {
                                    borderCollapse: 'collapse',
                                    width: '100%',
                                    mb: 2,
                                },
                                '& th, & td': {
                                    border: theme =>
                                        `1px solid ${theme.palette.divider}`,
                                    p: 1,
                                },
                                '& th': {
                                    bgcolor: theme =>
                                        theme.palette.mode === 'light'
                                            ? 'grey.100'
                                            : 'grey.800',
                                    fontWeight: 'bold',
                                },
                                '& blockquote': {
                                    borderLeft: theme =>
                                        `4px solid ${theme.palette.divider}`,
                                    m: 0,
                                    pl: 2,
                                    py: 0.5,
                                    color: 'text.secondary',
                                },
                            }}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({
                                        inline,
                                        className,
                                        children,
                                        ...props
                                    }: CodeProps) {
                                        if (inline) {
                                            return (
                                                <code className={className}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                        const match = /language-(\w+)/.exec(
                                            className || '',
                                        );
                                        const code = String(children).replace(
                                            /\n$/,
                                            '',
                                        );

                                        return match ? (
                                            <Box sx={{ position: 'relative' }}>
                                                <IconButton
                                                    className="copy-button"
                                                    size="small"
                                                    onClick={() =>
                                                        handleCopy(code)
                                                    }
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        bgcolor: 'action.hover',
                                                        color: 'text.primary',
                                                        zIndex: 1,
                                                        '&:hover': {
                                                            bgcolor:
                                                                'action.selected',
                                                        },
                                                    }}
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                                <SyntaxHighlighter
                                                    style={
                                                        isDarkMode
                                                            ? materialDark
                                                            : materialLight
                                                    }
                                                    language={match[1]}
                                                    PreTag="div"
                                                    customStyle={{ margin: 0 }}
                                                >
                                                    {code}
                                                </SyntaxHighlighter>
                                            </Box>
                                        ) : (
                                            <code className={className}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {displayContent}
                            </ReactMarkdown>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
