import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './RegistrationForm.module.css';
import { setUser } from '../../app/slices/authSlice';
import { useRegisterMutation } from '../../services/api';

export default function RegistrationForm() {
  const [register, { isLoading, error }] = useRegisterMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getFieldError(error: any, field: string): string | undefined {
    if (!error || !('data' in error)) return undefined;
    const e = error.data.errors?.find((e: any) => e.field === field);
    return e?.failures?.[0];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (confirmation !== password) {
      setLocalError('Passwords do not match');
      return;
    }
    try {
      const raw = await register({ username, password }).unwrap();
      const result = Array.isArray(raw) ? raw[0] : raw;

      console.log('Success:', result);

      const user = result.data;
      dispatch(setUser(user));
      console.log(user);

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/', { replace: true });
    } catch (err) {
      console.error('Registration error', err);
    }
  };
  return (
    <form className={style.example} onSubmit={handleSubmit}>
      <Typography variant="h1" color="primary">
        Sign up
      </Typography>

      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!getFieldError(error, 'username')}
        helperText={getFieldError(error, 'username')}
        fullWidth
      ></TextField>

      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!getFieldError(error, 'password')}
        helperText={getFieldError(error, 'password')}
        fullWidth
      ></TextField>

      <TextField
        label="Confirm password"
        variant="standard"
        type="password"
        value={confirmation}
        onChange={(e) => {
          setConfirmation(e.target.value);
        }}
        error={!!localError}
        helperText={localError || ''}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isLoading}
        sx={{ m: 2 }}
      >
        SIGN UP
      </Button>
    </form>
  );
}
