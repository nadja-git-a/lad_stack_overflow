import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import AnswerCard from '../../components/AnswerCard/AnswerCard';
import { useCreateAnswerMutation } from '../../services/api';
import { Answer } from '../../types/Types';

interface AnswersProps {
  questionId: string;
  answers: Answer[];
}

export default function AnswersList({ questionId, answers }: AnswersProps) {
  const [answer, setAnswer] = useState('');
  const [createAnswer] = useCreateAnswerMutation();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const handleSend = async () => {
    await createAnswer({
      questionId: questionId,
      content: answer,
    });
    setAnswer('');
  };
  return (
    <Stack>
      {answers && answers.length > 0 ? (
        answers.map((answer, i) => <AnswerCard key={i} answer={answer} />)
      ) : (
        <Typography>No Answers yet</Typography>
      )}
      {isAuth ?? (
        <>
          <Typography variant="h6" color="primary">
            Leave an answer
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TextField
              placeholder="answer text"
              fullWidth
              size="small"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
}
