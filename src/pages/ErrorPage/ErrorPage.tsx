import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Paper, Typography } from '@mui/material';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isRouterError = isRouteErrorResponse(error);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 3,
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

        <Typography variant="h4" fontWeight={600} gutterBottom>
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {isRouterError && error.status === 404
            ? "The page you're looking for doesn't exist."
            : 'An unexpected error occurred.'}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: 'text.disabled',
            mb: 3,
            fontFamily: 'monospace',
          }}
        >
          {isRouterError
            ? error.statusText || error.data?.message || 'Unknown error'
            : ((error as Error)?.message ?? 'Unknown error')}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
          }}
        >
          Go Home
        </Button>
      </Paper>
    </Box>
  );
}
