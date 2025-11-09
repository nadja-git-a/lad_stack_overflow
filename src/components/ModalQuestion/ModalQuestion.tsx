import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../router/guards/guards';
import { useAskQuestionMutation } from '../../services/api';
import { questionFormType, questionSchema } from './schemas/schema';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
export default function ModalQuestion({ open, onClose }: ModalProps) {
  const [askQuestion, { isLoading }] = useAskQuestionMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<questionFormType>({ resolver: zodResolver(questionSchema), mode: 'onTouched' });

  const onSubmit = async (data: questionFormType) => {
    try {
      await askQuestion({
        title: data.title,
        description: data.description,
        attachedCode: data.attachedCode,
      }).unwrap();
      onClose();

      reset();
    } catch (e: unknown) {
      toast.error(`Something went wrong: ${getErrorMessage(e)}`);
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
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Box>

        <Box>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder="Question description"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Box>

        <Box>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Code
          </Typography>
          <TextField
            fullWidth
            {...register('attachedCode')}
            error={!!errors.attachedCode}
            helperText={errors.attachedCode?.message}
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
          onClick={handleSubmit(onSubmit)}
          loading={isLoading || isSubmitting}
        >
          {isLoading ? 'Submitting…' : 'Submit question'}
        </Button>
      </Stack>
    </Dialog>
  );
}
