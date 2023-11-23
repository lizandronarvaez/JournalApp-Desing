import React, { useMemo, useState } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from '../../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';


const formData = {
    email: "",
    displayName: "",
    password: "",
}
const formValidations = {
    email: [(value) => value.includes('@'), 'Introduce un correo válido'],
    displayName: [(value) => value.length >= 6, 'Introduce un nombre completo'],
    password: [(value) => value.length >= 6, 'La contraseña debe tener un mínimo de 6 caracteres'],
}

const Register = () => {
    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticated = useMemo(() => status === "Checking", [status]);

    const [formSumbit, setFormSubmit] = useState(false);
    const { formState,
        isFormValid,
        emailValid,
        displayNameValid,
        passwordValid,
        onInputChange, onResetForm
    } = useForm(formData, formValidations);

    const onSubmitForm = (e) => {
        e.preventDefault();
        setFormSubmit(true);
        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    return (
        <AuthLayout title='Registro'>
            <form onSubmit={onSubmitForm} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            name='email'
                            label="Email"
                            type='email'
                            placeholder='email@example.com'
                            fullWidth
                            onChange={onInputChange}
                            error={!!emailValid && formSumbit}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            name="displayName"
                            label="Nombre"
                            type='text'
                            placeholder='Nombre Completo'
                            fullWidth
                            onChange={onInputChange}
                            error={!!displayNameValid && formSumbit}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            name="password"
                            label="Password"
                            type='password'
                            placeholder='Password'
                            fullWidth
                            onChange={onInputChange}
                            error={!!passwordValid && formSumbit}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={isAuthenticated}
                            >
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