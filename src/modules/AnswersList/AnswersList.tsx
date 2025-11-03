import { Stack, Typography } from '@mui/material';

import AnswerCard from '../../components/AnswerCard/AnswerCard';
import { Answer } from '../../types/Types';

interface AnswersProps {
  answers: Answer[];
}

export default function AnswersList({ answers }: AnswersProps) {
  return (
    <Stack>
      {answers && answers.length > 0 ? (
        answers.map((answer, i) => <AnswerCard key={i} answer={answer} />)
      ) : (
        <Typography>No Answers yet</Typography>
      )}
    </Stack>
  );
}
