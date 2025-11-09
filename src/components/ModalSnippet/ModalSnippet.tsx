import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AttachedCodeFormType, attachedCodeSchema } from './schemas/schema';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  code: string;
  onSave: (nextCode: string) => void;
}
export default function ModalSnippet({ open, onClose, onSave }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AttachedCodeFormType>({
    resolver: zodResolver(attachedCodeSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: AttachedCodeFormType) => {
    onSave(data.attachedCode);
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
          sx={{ minWidth: 32, height: 32, p: 0 }}
          onClick={onClose}
        >
          ×
        </Button>
      </Box>

      <Typography variant="h5" color="primary" sx={{ my: 2, textAlign: 'center', fontWeight: 600 }}>
        Edit this snippet
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
}
