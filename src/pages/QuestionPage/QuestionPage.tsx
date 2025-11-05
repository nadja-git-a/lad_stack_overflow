import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import ModalQuestion from '../../components/ModalQuestion/ModalQuestion';
import QuestionList from '../../modules/QuestionList/QuestionList';

export default function QuestionsPage() {
  const [open, setOpen] = useState(false);

  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h1" color="primary" sx={{ mt: 3, mb: 1, textAlign: 'center' }}>
        Questions
      </Typography>

      {isAuth && (
        <Button variant="contained" sx={{ my: 2 }} onClick={() => setOpen(true)}>
          Ask a question
        </Button>
      )}

      <ModalQuestion open={open} onClose={() => setOpen(false)} />

      <QuestionList page={1} limit={20} sortBy={['title:DESC', 'id:ASC']} />
    </Container>
  );
}
