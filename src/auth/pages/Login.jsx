import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { Google } from "@mui/icons-material";
import AuthLayout from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForms';
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: "",
  password: ""
}
const Login = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const { email, password, formState, onInputChange, onResetForm } = useForm(formData);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
      <form
        onSubmit={onSubmitForm}
        className='animate__animated animate__fadeIn  animate__faster'
        aria-label='submitForm'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type='email'
              placeholder='email@example.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type='password'
              placeholder='Password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              inputProps={{
                "data-testid": "password"
              }}
            />
          </Grid>
          <Grid
            container
            sx={{ mt: 1 }}
            display={!!errorMessage ? '' : 'none'}
          >
            <Grid item xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                variant='contained'
                fullWidth type='submit'
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={17} sm={6}>
              <Button
                disabled={isAuthenticated}
                onClick={onGoogleLogin}
                variant='contained'
                fullWidth
                aria-label='google-btn'
              >
                <Google />
                <Typography sx={{ ml: 1 }}>GOOGLE</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
            <Link component={LinkRouter} color="inherit" to="/auth/register">
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout >
  )
}

export default Login