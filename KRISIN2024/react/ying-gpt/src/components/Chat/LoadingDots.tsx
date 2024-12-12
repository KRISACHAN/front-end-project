import { Box, keyframes } from '@mui/material';

const blink = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

/**
 * 加载动画组件
 * - 三个点的闪烁动画
 * - 模仿 ChatGPT 的加载效果
 */
export default function LoadingDots() {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0.5,
                alignItems: 'center',
                p: 0.5,
                marginTop: '5px',
            }}
        >
            {[0].map(i => (
                <Box
                    key={i}
                    sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bgcolor: 'text.secondary',
                        animation: `${blink} 1.4s infinite linear`,
                        animationDelay: `${i * 0.2}s`,
                    }}
                />
            ))}
        </Box>
    );
}
