import { Box, CircularProgress, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import ModalMarkAlert from '../../components/ModalMarkAlert/ModalMarkAlert';
import SnippetCard from '../../components/SnippetCard/SnippetCard';
import { api, useMarkSnippetMutation, useSnippetsQuery } from '../../services/api';
import { QueryArgs } from '../../types/Types';

export default function SnippetList({
  userId,
  page,
  limit,
  sortBy = ['id:DESC'],
  search = '',
}: QueryArgs) {
  const [statePage, setStatePage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError, refetch } = useSnippetsQuery(
    {
      userId,
      page: statePage,
      limit,
      sortBy,
      search,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    const srvPage = data?.meta?.currentPage;
    if (srvPage && srvPage !== page) setStatePage(srvPage);
  }, [data?.meta, page]);

  const [markSnippet] = useMarkSnippetMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) return <CircularProgress />;
  if (isError || !data) return <div>Something went wrong...</div>;

  const snippets = data?.data ?? ['something went wrong'];
  const currentPage = data.meta?.currentPage;
  console.log('currentPage', currentPage);
  const totalPages = data.meta?.totalPages;
  console.log('totalPages', totalPages);

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setStatePage(value);
  };

  const handleLike = async (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    await markSnippet({ id, mark: 'like' });
    refetch();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  const handleDislike = async (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    await markSnippet({ id, mark: 'dislike' });
    refetch();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  const handleComment = (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    navigate(`/snippet/${id}`);
  };

  return (
    <Box>
      <ModalMarkAlert open={openModal} onClose={() => setOpenModal(false)} />

      <Pagination
        page={statePage}
        count={totalPages}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          mb: 4,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {snippets.map((snip) => (
          <SnippetCard
            key={snip.id}
            snippet={snip}
            onLike={() => handleLike(snip.id)}
            onDislike={() => handleDislike(snip.id)}
            onComment={() => handleComment(snip.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
