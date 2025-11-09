import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from '../../app/store';
import { getErrorMessage } from '../../router/guards/guards';
import { useDeleteSnippetMutation, useEditSnippetMutation } from '../../services/api';
import { Snippet } from '../../types/Types';
import ModalSnippet from '../ModalSnippet/ModalSnippet';

export interface SnippetCardProps {
  snippet: Omit<Snippet, 'marks'>;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onComment?: (id: number) => void;
  onClick?: () => void;
}

export default function SnippetCard({
  snippet,
  onLike,
  onDislike,
  onComment,
  onClick,
}: SnippetCardProps) {
  const { id, language, code, user, likesCount, dislikesCount } = snippet;
  const userSavedId = useSelector((state: RootState) => state.auth.id);
  const [deleteSnippet] = useDeleteSnippetMutation();
  const [editSnippet] = useEditSnippetMutation();

  const [editOpen, setEditOpen] = useState(false);

  if (user == undefined) return;
  const initial = user?.username?.[0]?.toUpperCase() ?? '?';

  const handleDelete = async (snippetId: number) => {
    try {
      await deleteSnippet({ id: snippetId }).unwrap();
    } catch (e: unknown) {
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
    }
  };

  const handleEditSave = async (nextCode: string) => {
    try {
      await editSnippet({ id, code: nextCode, language: language }).unwrap();
      setEditOpen(false);
    } catch (e: unknown) {
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
    }
  };

  return (
    <Card sx={{ mb: 2, width: '90%' }} onClick={onClick}>
      <CardHeader
        avatar={<Avatar aria-label="user">{initial}</Avatar>}
        title={user.username}
        subheader={language}
        action={
          user.id == userSavedId && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id);
                }}
              >
                Delete
              </Button>
            </Stack>
          )
        }
      />

      <ModalSnippet
        open={editOpen}
        onClose={() => setEditOpen(false)}
        code={code}
        onSave={handleEditSave}
      />

      <CardContent>
        <Typography
          component="pre"
          sx={{
            fontFamily: 'monospace',
            backgroundColor: 'grey.100',
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
          <Badge badgeContent={likesCount ?? 0} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="dislike" onClick={() => onDislike?.(id)}>
          <Badge badgeContent={dislikesCount ?? 0} color="primary">
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
