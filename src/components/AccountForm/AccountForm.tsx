import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import {
  PasswordFormType,
  passwordSchema,
  UsernameFormType,
  usernameSchema,
} from './schemas/schemas';
import { updateUsername } from '../../app/slices/authSlice';
import { useUpdateMeMutation, useUpdatePasswordMutation } from '../../services/api';
import { ErrorMessage } from '../../types/Types';

export default function AccountForm() {
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const dispatch = useDispatch();

  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: usernameErrors, isSubmitting: isUsernameSubmitting },
    reset: resetUsername,
  } = useForm<UsernameFormType>({
    resolver: zodResolver(usernameSchema),
    mode: 'onTouched',
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    mode: 'onTouched',
  });

  const onSave = async (data: UsernameFormType) => {
    try {
      await updateMe({ username: data.newUsername }).unwrap();
      dispatch(updateUsername(data.newUsername));
      resetUsername();
    } catch (e: unknown) {
      const error = (e as ErrorMessage)?.data?.message ?? 'Unknown error';

      toast.error(`Something went wrong: ${error}`, {
        position: 'bottom-right',
      });
    }
  };

  const onChange = async (data: PasswordFormType) => {
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      resetPassword();
    } catch (e: unknown) {
      const error = (e as ErrorMessage)?.data?.message ?? 'Unknown error';

      toast.error(`Something went wrong: ${error}`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Typography variant="h4" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        Edit your profile
      </Typography>

      <Divider sx={{ mb: 4, width: '100%', maxWidth: 900 }} />

      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: 4,
          flexWrap: 'wrap',
          maxWidth: 900,
        }}
      >
        <Stack component="form" spacing={2} onSubmit={handleSubmitUsername(onSave)}>
          <Typography variant="subtitle1" color="primary" fontWeight={600}>
            Change your username
          </Typography>
          <TextField
            label="New username"
            variant="outlined"
            {...registerUsername('newUsername')}
            error={!!usernameErrors.newUsername}
            helperText={usernameErrors.newUsername?.message}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading || isUsernameSubmitting}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Stack>

        <Stack component="form" onSubmit={handleSubmitPassword(onChange)} spacing={2}>
          <Typography variant="subtitle1" color="primary" fontWeight={600}>
            Change your password
          </Typography>
          <TextField
            label="Old password"
            type="password"
            {...registerPassword('oldPassword')}
            error={!!passwordErrors.oldPassword}
            helperText={passwordErrors.oldPassword?.message}
            fullWidth
          />
          <TextField
            label="New password"
            type="password"
            {...registerPassword('newPassword')}
            error={!!passwordErrors.newPassword}
            helperText={passwordErrors.newPassword?.message}
            fullWidth
          />
          <TextField
            label="Confirm password"
            type="password"
            {...registerPassword('confirmNewPassword')}
            error={!!passwordErrors.confirmNewPassword}
            helperText={passwordErrors.confirmNewPassword?.message}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || isPasswordSubmitting}
          >
            Change password
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
}
