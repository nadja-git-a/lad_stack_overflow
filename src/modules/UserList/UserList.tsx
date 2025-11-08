import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import UserCard from '../../components/UserCard/UserCard';
import { useUsersQuery } from '../../services/api';
import { UiUser } from '../../types/Types';

export default function UserList() {
  const [users, setUsers] = useState<UiUser[]>([]);
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading, isError, isFetching } = useUsersQuery({ page, limit });

  useEffect(() => {
    const pageItems = data?.data?.data ?? [];
    if (pageItems.length) {
      setUsers((prev) => {
        const seen = new Set(prev.map((u) => u.id));
        const next = pageItems.filter((u) => !seen.has(u.id));
        return [...prev, ...next];
      });
    }
  }, [data]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        if (isFetching) return;

        const totalPages = data?.data?.meta?.totalPages ?? 1;
        if (page < totalPages) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 1,
        root: null,
        rootMargin: '200px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [data, isFetching, page]);

  if (isLoading && page === 1) {
    return <Typography>Loading…</Typography>;
  }
  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  const totalPages = data?.data?.meta?.totalPages ?? 1;
  const hasMore = page < totalPages;

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
        mx: 'auto',
        mt: 4,
        maxWidth: 720,
      }}
    >
      <Stack spacing={2}>
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No users yet
          </Typography>
        )}

        {hasMore ? (
          <Stack alignItems="center" py={2} ref={loaderRef}>
            {isFetching && <CircularProgress size={28} />}
          </Stack>
        ) : (
          users.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No more users are found
            </Typography>
          )
        )}
      </Stack>
    </Paper>
  );
}
