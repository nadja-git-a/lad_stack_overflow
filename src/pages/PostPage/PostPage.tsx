import { zodResolver } from '@hookform/resolvers/zod';
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
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import SnippetCard from '../../components/SnippetCard/SnippetCard';
import CommentsList from '../../modules/CommentsList/CommentsList';
import {
  api,
  useLeaveCommentMutation,
  useMarkSnippetMutation,
  useSnippetByIdQuery,
} from '../../services/api';

const CommentSchema = z.object({
  comment: z.string().min(10, 'A comment should contain at least 20 characters'),
});
type CommentFormType = z.infer<typeof CommentSchema>;

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [markSnippet] = useMarkSnippetMutation();
  const [leaveComment] = useLeaveCommentMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CommentFormType>({
    resolver: zodResolver(CommentSchema),
    mode: 'onTouched',
  });

  const {
    data: snippet,
    isLoading,
    isError,
    refetch,
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
    likesCount: snippet.data.likesCount,
    dislikesCount: snippet.data.dislikesCount,
  };

  if (snippet.data.comments == undefined) return;

  const handleLike = async (id: number) => {
    await markSnippet({ id, mark: 'like' });
    dispatch(api.util.invalidateTags(['Snippet']));
    refetch();
  };

  const handleDislike = async (id: number) => {
    await markSnippet({ id, mark: 'dislike' });
    dispatch(api.util.invalidateTags(['Snippet']));
    refetch();
  };

  const onSubmit = async (data: CommentFormType) => {
    await leaveComment({
      snippetId: Number(id),
      content: data.comment,
    });

    dispatch(api.util.invalidateTags(['Comments']));
    reset();
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
              onLike={() => handleLike(snippetForCard.id)}
              onDislike={() => handleDislike(snippetForCard.id)}
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

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  label="Leave a comment..."
                  {...register('comment')}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                  }}
                  error={!!errors.comment}
                  helperText={errors.comment?.message}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
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
