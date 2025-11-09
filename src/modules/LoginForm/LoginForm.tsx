import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setUser } from '../../app/slices/authSlice';
import { getErrorMessage } from '../../router/guards/guards';
import { useLogInMutation } from '../../services/api';
import { LoginFormType, loginSchema } from './schemas/schema';

export default function LoginForm() {
  const [logIn, { isLoading }] = useLogInMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    try {
      const raw = await logIn({ username: data.username, password: data.password }).unwrap();
      const result = Array.isArray(raw) ? raw[0] : raw;
      const user = result.data;
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/', { replace: true });
    } catch (e: unknown) {
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
    }
  };

  return (
    <Box
      component="form"
      sx={(theme) => ({
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        maxWidth: 300,
        gap: theme.spacing(2.5),
        padding: theme.spacing(2.5, 1.1),
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h1" color="primary">
        Log in
      </Typography>

      <TextField
        label="Username"
        variant="standard"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
      ></TextField>

      <TextField
        label="Password"
        variant="standard"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isSubmitting || isLoading}
        sx={{ m: 2 }}
      >
        LOG IN
      </Button>
    </Box>
  );
}
