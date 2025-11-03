import { Box, Typography } from '@mui/material';

import UserList from '../../modules/UserList/UserList';

export default function UsersPage() {
  return (
    <Box>
      <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        List of all users
      </Typography>
      <UserList />
    </Box>
  );
}
