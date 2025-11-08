import { Avatar, Box, Button, Card, Container, Paper, Stack, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { logout } from '../../app/slices/authSlice';
import { RootState } from '../../app/store';
import AccountForm from '../../components/AccountForm/AccountForm';
import { useDeleteMeMutation, useUserStatisticsQuery } from '../../services/api';
import { ErrorMessage } from '../../types/Types';

export default function AccountPage() {
  const username = useSelector((state: RootState) => state.auth.username);
  const id = useSelector((state: RootState) => state.auth.id);
  const role = useSelector((state: RootState) => state.auth.role);
  const [deleteMe] = useDeleteMeMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: statsResponse,
    isLoading,
    error,
  } = useUserStatisticsQuery(id != null ? { id } : skipToken);

  const stats = statsResponse?.data;

  const handleDelete = async () => {
    try {
      await deleteMe(undefined).unwrap();
      dispatch(logout());
      navigate('/');
    } catch (e: unknown) {
      const error = (e as ErrorMessage)?.data?.message ?? 'Unknown error';

      toast.error(`Something went wrong: ${error}`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <ToastContainer />
        <Card
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 64,
                height: 64,
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              {username?.[0]?.toUpperCase() ?? '?'}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Welcome, {username}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                role: {role}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            <Stack spacing={1.2}>
              <Box>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
                  Username
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {username}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
                  ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
                  Role
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {role}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 600 }}
              onClick={() => dispatch(logout())}
            >
              Log out
            </Button>

            <Button
              variant="text"
              color="error"
              sx={{ textTransform: 'none', fontWeight: 600 }}
              onClick={handleDelete}
            >
              Delete this account
            </Button>
          </Stack>
        </Card>
      </Container>
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        {isLoading && (
          <Typography align="center" color="text.secondary">
            Loading statistics…
          </Typography>
        )}

        {error && (
          <Typography align="center" color="error">
            Failed to load statistics
          </Typography>
        )}

        {stats && (
          <>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: 600,
                mb: 2,
                textAlign: 'center',
              }}
            >
              User Statistics
            </Typography>

            <Stack spacing={1.5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Rating</Typography>
                <Typography fontWeight={600}>{stats.statistic.rating}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Snippets</Typography>
                <Typography fontWeight={600}>{stats.statistic.snippetsCount}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Likes</Typography>
                <Typography fontWeight={600}>{stats.statistic.likesCount}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Dislikes</Typography>
                <Typography fontWeight={600}>{stats.statistic.dislikesCount}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Questions</Typography>
                <Typography fontWeight={600}>{stats.statistic.questionsCount}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Correct answers</Typography>
                <Typography fontWeight={600}>{stats.statistic.correctAnswersCount}</Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography color="text.secondary">Regular answers</Typography>
                <Typography fontWeight={600}>{stats.statistic.regularAnswersCount}</Typography>
              </Paper>
            </Stack>
          </>
        )}

        <AccountForm></AccountForm>
      </Box>
    </>
  );
}
