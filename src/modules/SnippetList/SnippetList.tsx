import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SnippetCard from '../../components/SnippetCard/SnippetCard';
import { api, useMarkSnippetMutation, useSnippetsQuery } from '../../services/api';

export default function SnippetList() {
  const { data: snippets = [], isLoading, isError } = useSnippetsQuery({ page: 1, limit: 20 });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [markSnippet] = useMarkSnippetMutation();

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Something went wrong...</div>;

  const handleLike = async (id: number) => {
    await markSnippet({ id, mark: 'like' }).unwrap();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  const handleDislike = async (id: number) => {
    await markSnippet({ id, mark: 'dislike' }).unwrap();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  return (
    <Box>
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
            onComment={() => navigate(`/snippet/${snip.id}`)}
          />
        ))}
      </Box>
    </Box>
  );
}
