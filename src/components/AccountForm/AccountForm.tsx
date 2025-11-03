import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUsername } from '../../app/slices/authSlice';
import { useUpdateMeMutation } from '../../services/api';

export default function AccountForm() {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const handleSave = async () => {
    if (!newUsername.trim()) return;
    try {
      await updateMe({ username: newUsername }).unwrap();
      setNewUsername('');
      dispatch(updateUsername(newUsername));
    } catch (error) {
      console.error('Failed to update username', error);
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
        {/* Смена имени */}
        <Stack spacing={2}>
          <Typography variant="subtitle1" color="primary" fontWeight={600}>
            Change your username
          </Typography>
          <TextField
            label="New username"
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
          />
          <Button variant="contained" size="large" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle1" color="primary" fontWeight={600}>
            Change your password
          </Typography>
          <TextField
            label="Old password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="New password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" size="large">
            Change password
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
}
