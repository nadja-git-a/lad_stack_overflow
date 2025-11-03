import { Alert, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import QuestionCard from '../../components/Question/Question';
import { useQuestionsQuery } from '../../services/api';
import { QueryArgs, Question } from '../../types/Types';

export default function QuestionList(props: QueryArgs) {
  const { data, isLoading, isError } = useQuestionsQuery(props);
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load questions</Alert>;

  if (data?.data == undefined) return;
  const questions: Question[] = data?.data?.data ?? [];

  return (
    <Stack spacing={2}>
      {questions.map((quest: Question) => (
        <QuestionCard
          key={quest.id}
          question={quest}
          onOpen={(id) => navigate(`/questions/${id}`)}
        />
      ))}
    </Stack>
  );
}
