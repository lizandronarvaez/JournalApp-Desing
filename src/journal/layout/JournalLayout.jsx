import { Box } from '@mui/system'
import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar';
import { Toolbar } from '@mui/material';

const drawerWidth = 240;
const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <NavBar drawerWidth={drawerWidth} />
            <SideBar drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default JournalLayout