import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { UiUser } from '../../types/Types';

interface UserProp {
  user: UiUser;
}

export default function UserCard({ user }: UserProp) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {user.username?.[0]?.toUpperCase() ?? '?'}
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                display: 'inline-block',
                px: 1.2,
                py: 0.3,
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              {user.role.toUpperCase()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
