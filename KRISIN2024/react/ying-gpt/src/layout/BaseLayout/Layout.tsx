import { useState } from 'react';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import MainContent from './MainContent';
import Sidebar from './Sidebar';

export default function Layout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                bgcolor: 'var(--main-bg)',
                color: 'var(--text-primary)',
            }}
        >
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MainContent open={sidebarOpen} />
        </Box>
    );
}
