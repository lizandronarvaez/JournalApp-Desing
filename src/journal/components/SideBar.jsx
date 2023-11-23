import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';

const SideBar = ({ drawerWidth }) => {
    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open={true}
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography
                        variant='h6'
                        sx={{ textTransform: "capitalize" }}
                        noWrap
                        component="div"
                    >
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {notes.length === 0 ?
                        <Typography
                            fontSize={".8rem"}
                            color={"error"}
                            fontWeight={600}
                            sx={{ textTransform: "uppercase", textAlign: "center" }}
                        >
                            No existen notas disponibles
                        </Typography>
                        : notes.map((note, i) => (
                            <SidebarItem
                                key={i}
                                note={note}
                            />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default SideBar