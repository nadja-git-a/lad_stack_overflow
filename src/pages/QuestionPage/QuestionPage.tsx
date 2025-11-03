import { Container, Typography } from '@mui/material';

import QuestionList from '../../modules/QuestionList/QuestionList';

export default function QuestionsPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        Questions
      </Typography>

      <QuestionList page={1} limit={20} sortBy={['title:DESC', 'id:ASC']} />
    </Container>
  );
}
