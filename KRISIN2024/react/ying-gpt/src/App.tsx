import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import Layout from './layout/BaseLayout/Layout';
import { useTheme } from './contexts/ThemeContext';
import { createAppTheme } from './styles/theme';

/**
 * 应用程序根组件
 * - 设置全屏高度
 * - 设置背景色
 * - 应用主题
 */
export default function App() {
    const { isDarkMode } = useTheme();
    const theme = createAppTheme(isDarkMode);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', bgcolor: 'var(--main-bg)' }}>
                <Layout />
            </Box>
        </MuiThemeProvider>
    );
}
