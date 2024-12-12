import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题提供者组件
 * - 管理深色/浅色主题状态
 * - 自动根据时间切换主题
 * - 提供手动切换主题的方法
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    // 检查当前时间并设置主题
    const checkTime = () => {
        const currentHour = new Date().getHours();
        // 晚上8点到早上6点使用深色主题
        setIsDarkMode(currentHour >= 20 || currentHour < 6);
    };

    // 初始化和每小时检查时间
    useEffect(() => {
        checkTime();
        const interval = setInterval(checkTime, 1000 * 60 * 60); // 每小时检查一次

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
