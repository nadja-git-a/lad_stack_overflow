import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import style from './RegistrationForm.module.css';
import { setUser } from '../../app/slices/authSlice';
import { useRegisterUserMutation } from '../../services/api';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

const RegistrationSchema = z
  .object({
    username: z.string().min(5, 'Username should contain at least 5 characters'),
    password: z
      .string()
      .min(6, 'Password should contain at least 6 characters')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
      ),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

type RegistrationFormType = z.infer<typeof RegistrationSchema>;

export default function RegistrationForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(RegistrationSchema),
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={style.example} onSubmit={handleSubmit(onSubmit)}>
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

      <TextField
        label="Confirm password"
        variant="standard"
        type="password"
        {...register('confirm')}
        error={!!errors.confirm}
        helperText={errors.confirm?.message}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isSubmitting || isLoading}
        sx={{ m: 2 }}
      >
        SIGN UP
      </Button>
    </form>
  );
}
