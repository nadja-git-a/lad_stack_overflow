import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { RegistrationFormType, registrationSchema } from './schemas/schemas';
import { setUser } from '../../app/slices/authSlice';
import { useRegisterUserMutation } from '../../services/api';
import { ErrorMessage } from '../../types/Types';

export default function RegistrationForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegistrationFormType) => {
    try {
      const raw = await registerUser({ username: data.username, password: data.password }).unwrap();
      const result = Array.isArray(raw) ? raw[0] : raw;
      const user = result.data;
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/', { replace: true });
    } catch (e: unknown) {
      const error = (e as ErrorMessage)?.data?.message ?? 'Unknown error';

      toast.error(`Something went wrong: ${error}`, {
        position: 'bottom-right',
      });
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
      <ToastContainer />

      <Typography variant="h1" color="primary">
        Sign up
      </Typography>

      <TextField
        label="Username"
        variant="standard"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
      />

      <TextField
        label="Password"
        variant="standard"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <TextField
        label="Confirm password"
        variant="standard"
        type="password"
        {...register('confirm')}
        error={!!errors.confirm}
        helperText={errors.confirm?.message}
        fullWidth
      />

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isSubmitting || isLoading}
        sx={{ m: 2 }}
      >
        SIGN UP
      </Button>
    </Box>
  );
}
