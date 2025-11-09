import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUsername } from '../../app/slices/authSlice';
import { getErrorMessage } from '../../router/guards/guards';
import { useUpdateMeMutation, useUpdatePasswordMutation } from '../../services/api';
import {
  PasswordFormType,
  passwordSchema,
  UsernameFormType,
  usernameSchema,
} from './schemas/schemas';

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
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
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
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        Edit your profile
      </Typography>

      <Divider sx={{ mb: 4, width: '100%', maxWidth: 900 }} />

      <Grid
        container
        spacing={4}
        sx={{
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
            loading={isLoading}
            disabled={isPasswordSubmitting}
          >
            Change password
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
}
