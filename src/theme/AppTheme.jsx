import React from 'react'
import purpleTheme from './purpleTheme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default AppTheme