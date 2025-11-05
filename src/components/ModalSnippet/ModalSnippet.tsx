import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  code: string;
  onSave: (nextCode: string) => void;
}
export default function ModalSnippet({ open, onClose, code, onSave }: ModalProps) {
  const [attachedCode, setAttachedCode] = useState(code);

  useEffect(() => setAttachedCode(code), [code, open]);

  const handleSave = () => {
    onSave(attachedCode);
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!attachedCode.trim()}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
}
