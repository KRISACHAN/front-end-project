import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

import './styles/index.less';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <ChatProvider>
                <App />
            </ChatProvider>
        </ThemeProvider>
    </StrictMode>,
);
