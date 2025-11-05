import { Avatar, Box, Typography } from '@mui/material';

export interface CommentProps {
  username: string;
  content: string;
}

export default function Comment({ username, content }: CommentProps) {
  const initial = username?.[0]?.toUpperCase() ?? '?';
  return (
    <Box
      sx={{
        width: '100%',
        p: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          width: '100%',
          p: 2,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <Avatar sx={{ flexShrink: 0 }}>{initial}</Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 500, lineHeight: 1.3, color: 'text.primary' }}
          >
            {username}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 1,
              lineHeight: 1.4,
              color: 'text.secondary',
              wordBreak: 'break-word',
            }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
