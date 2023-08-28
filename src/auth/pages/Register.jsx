import React from 'react';
import { Link as LinkRouter } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

const Register = () => {
    return (
        <AuthLayout title='Registro'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type='email'
                            placeholder='email@example.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre"
                            type='email'
                            placeholder='Nombre Completo'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type='password'
                            placeholder='Password'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Repetir Password"
                            type='password'
                            placeholder='Repetir Password'
                            fullWidth
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                        <Grid item xs={12}>
                            <Button variant='contained' fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta? </Typography>
                        <Link component={LinkRouter} color="inherit" to="/auth/login">
                            Inicia Sesion
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout >
    )
}

export default Register