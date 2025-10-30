import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './LoginForm.module.css';
import { setUser } from '../../app/slices/authSlice';
import { useLogInMutation } from '../../services/api';

export default function LoginForm() {
  const [logIn, { isLoading, error }] = useLogInMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getError(err: any): string | undefined {
    if (!err || !('data' in err)) return undefined;
    const data = err.data as any;
    return data?.message || data?.detail || data?.error || undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = await logIn({ username, password }).unwrap();
      const result = Array.isArray(raw) ? raw[0] : raw;

      const user = result.data;
      dispatch(setUser(user));
      console.log(user);

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={style.example} onSubmit={handleSubmit}>
      <Typography variant="h1" color="primary">
        Log in
      </Typography>

      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!getError(error)}
        helperText={getError(error)}
        fullWidth
      ></TextField>

      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        error={!!getError(error)}
        helperText={getError(error)}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isLoading}
        sx={{ m: 2 }}
      >
        LOG IN
      </Button>
    </form>
  );
}
