import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2/dist/sweetalert2.all";
import { startLogout } from '../../store/auth/thunks';

const NavBar = ({ drawerWidth }) => {
    const dispatch = useDispatch();
    const onLogout = () => {
        Swal.fire({
            title: "Logout",
            text: "Desea cerrar la sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cerrar sesión",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startLogout())
            }
        });
    }
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='h6' noWrap component="div">JournalApp</Typography>
                    <IconButton
                        color='error'
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}

export default NavBar