import { Box, Typography } from '@mui/material';

interface UserInfoProps {
  title: string | null;
  info: string | number | null;
}

export default function UserInfo({ title, info }: UserInfoProps) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {info}
      </Typography>
    </Box>
  );
}
