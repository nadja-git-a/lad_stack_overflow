import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import SnippetCard from '../../components/SnippetCard/SnippetCard';
import CommentsList from '../../modules/CommentsList/CommentsList';
import {
  api,
  useLeaveCommentMutation,
  useMarkSnippetMutation,
  useSnippetByIdQuery,
} from '../../services/api';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [markSnippet] = useMarkSnippetMutation();
  const [leaveComment] = useLeaveCommentMutation();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const {
    data: snippet,
    isLoading,
    isError,
  } = useSnippetByIdQuery({
    id: Number(id),
  });

  if (!id) return <div>Invalid ID</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !snippet) return <div>Something went wrong...</div>;

  const snippetForCard = {
    id: snippet.data.id,
    language: snippet.data.language,
    code: snippet.data.code,
    user: snippet.data.user,
    // likes: snippet.data.marks.likes,
    // dislikes: snippet.data.marks.dislikes,
  };

  const handleLike = async (id: number) => {
    await markSnippet({ id, mark: 'like' }).unwrap();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  const handleDislike = async (id: number) => {
    await markSnippet({ id, mark: 'dislike' }).unwrap();
    dispatch(api.util.invalidateTags(['Snippet']));
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    await leaveComment({
      snippetId: Number(id),
      content: comment.trim(),
    });

    setComment('');
    dispatch(api.util.invalidateTags(['Comments']));
  };
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 3 }}>
            <SnippetCard
              snippet={snippetForCard}
              onLike={() => {
                handleLike(Number(id));
              }}
              onDislike={() => {
                handleDislike(Number(id));
              }}
            />
          </Box>

          <Divider />

          <Box sx={{ p: 3 }}>
            <CommentsList comments={snippet.data.comments} />
          </Box>

          <Divider />

          <Box sx={{ p: 3, backgroundColor: 'background.default' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Add a Comment
            </Typography>

            <Box component="form" onSubmit={handleComment}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  label="Leave a comment..."
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Send
                </Button>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
