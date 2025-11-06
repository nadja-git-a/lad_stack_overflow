import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import style from './LoginForm.module.css';
import { setUser } from '../../app/slices/authSlice';
import { useLogInMutation } from '../../services/api';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const LoginSchema = z.object({
  username: z.string().min(5, 'Username should contain at least 5 characters'),
  password: z
    .string()
    .min(6, 'Password should contain at least 6 characters')
    .regex(
      PASSWORD_REGEX,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
    ),
});

type LoginFormType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [logIn, { isLoading }] = useLogInMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={style.example} onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}
