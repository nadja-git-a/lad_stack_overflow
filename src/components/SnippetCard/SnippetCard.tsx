import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';

import { SnippetCardProps } from '../../types/Types';

export default function SnippetCard({
  snippet,
  onLike,
  onDislike,
  onComment,
  onClick,
}: SnippetCardProps) {
  const { id, language, code, user, likes, dislikes } = snippet;
  const initial = user?.username?.[0]?.toUpperCase() ?? '?';

  return (
    <Card sx={{ mb: 2, width: '90%' }} onClick={onClick}>
      <CardHeader
        avatar={<Avatar aria-label="user">{initial}</Avatar>}
        title={user.username}
        subheader={language}
      />

      <CardContent>
        <Typography
          component="pre"
          sx={{
            fontFamily: 'monospace',
            backgroundColor: '#f5f5f5',
            p: 1,
            borderRadius: 1,
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}
        >
          {code}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={() => onLike?.(id)}>
          <Badge badgeContent={likes ?? 0} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="dislike" onClick={() => onDislike?.(id)}>
          <Badge badgeContent={dislikes ?? 0} color="primary">
            <ThumbDownAltIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="comments" onClick={() => onComment?.(id)}>
          <Badge color="secondary">
            <CommentIcon />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
}
