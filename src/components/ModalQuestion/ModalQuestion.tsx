import { Box, Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { useAskQuestionMutation } from '../../services/api';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
export default function ModalQuestion({ open, onClose }: ModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachedCode, setAttachedCode] = useState('');

  const [askQuestion, { isLoading, error }] = useAskQuestionMutation();

  const handleSubmit = async () => {
    try {
      await askQuestion({ title, description, attachedCode }).unwrap();
      onClose();

      setTitle('');
      setDescription('');
      setAttachedCode('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiPaper-root': { borderRadius: 3, p: 3 } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 32, height: 32, lineHeight: 1, p: 0 }}
          onClick={onClose}
        >
          ×
        </Button>
      </Box>

      <Typography variant="h5" color="primary" sx={{ my: 2, textAlign: 'center', fontWeight: 600 }}>
        Ask your question
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Question
          </Typography>
          <TextField
            fullWidth
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder="Question description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Code
          </Typography>
          <TextField
            value={attachedCode}
            onChange={(e) => setAttachedCode(e.target.value)}
            fullWidth
            multiline
            minRows={8}
            placeholder="// paste or type your code here"
            autoComplete="off"
            sx={{
              '& .MuiInputBase-input': {
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 14,
                lineHeight: 1.5,
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ alignSelf: 'flex-end' }}
          onClick={handleSubmit}
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? 'Submitting…' : 'Submit question'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {(error as any)?.data?.message ?? 'Failed to submit'}
          </Typography>
        )}
      </Stack>
    </Dialog>
  );
}
