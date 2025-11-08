import { Box, Typography } from '@mui/material';

import SnippetList from '../../modules/SnippetList/SnippetList';

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
          Welcome to Codelang!
        </Typography>
        <SnippetList></SnippetList>
      </Box>
    </>
  );
}
