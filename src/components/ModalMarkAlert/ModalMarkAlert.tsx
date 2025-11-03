import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalMarkAlert({ open, onClose }: ModalProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Authorization required</DialogTitle>
      <DialogContent>
        <Typography>To like, dislike or comment, please log in to your account.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Continue as guest</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClose();
            navigate('/login');
          }}
        >
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
}
