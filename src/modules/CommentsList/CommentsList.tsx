import { Box, CardContent, Typography } from '@mui/material';

import Comment from '../../components/Comment/Comment';
import { CommentListProps } from '../../types/Types';

export default function CommentsList({ comments }: CommentListProps) {
  const safeComments = Array.isArray(comments) ? comments : [];

  if (safeComments.length === 0) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 3,
          textAlign: 'center',
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No comments yet
        </Typography>
      </Box>
    );
  }

  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Comments ({safeComments.length})
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: 400,
          overflowY: 'auto',
          pr: 1,
        }}
      >
        {safeComments.map((comment) => (
          <Comment key={comment.id} username={comment.user.username} content={comment.content} />
        ))}
      </Box>
    </CardContent>
  );
}
