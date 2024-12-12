import { createTheme, ThemeOptions } from '@mui/material/styles';

// CSS 变量的类型定义
interface CustomVars {
    '--sidebar-bg': string;
    '--main-bg': string;
    '--input-bg': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--hover-color': string;
}

// 浅色主题配置
const lightTheme: ThemeOptions & { customVars: CustomVars } = {
    palette: {
        mode: 'light',
        background: {
            default: '#FFFFFF',
            paper: '#F7F7F8',
        },
        text: {
            primary: '#2D3748',
            secondary: '#4A5568',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    customVars: {
        '--sidebar-bg': '#F7F7F8',
        '--main-bg': '#FFFFFF',
        '--input-bg': '#FFFFFF',
        '--text-primary': '#2D3748',
        '--text-secondary': '#4A5568',
        '--hover-color': '#EDF2F7',
    },
};

// 深色主题配置
const darkTheme: ThemeOptions & { customVars: CustomVars } = {
    palette: {
        mode: 'dark',
        background: {
            default: '#343541',
            paper: '#202123',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#C5C5D2',
        },
    },
    customVars: {
        '--sidebar-bg': '#202123',
        '--main-bg': '#343541',
        '--input-bg': '#40414F',
        '--text-primary': '#FFFFFF',
        '--text-secondary': '#C5C5D2',
        '--hover-color': '#2A2B32',
    },
};

/**
 * 创建主题
 * @param isDarkMode 是否为深色主题
 */
export const createAppTheme = (isDarkMode: boolean) => {
    const themeConfig = isDarkMode ? darkTheme : lightTheme;

    const theme = createTheme({
        ...themeConfig,
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    ':root': themeConfig.customVars,
                    body: {
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: isDarkMode ? '#666' : '#CBD5E0',
                            borderRadius: '4px',
                        },
                    },
                },
            },
        },
    });

    return theme;
};
