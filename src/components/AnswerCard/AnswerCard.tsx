import { Box, Typography } from '@mui/material';

import { Answer } from '../../types/Types';

interface AnswerProp {
  answer: Answer;
}

export default function AnswerCard({ answer }: AnswerProp) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        py: 0.75,
        px: 1.25,
        '&::before': {
          content: '"•"',
          color: 'text.secondary',
          fontWeight: 'bold',
          display: 'inline-block',
          width: '1em',
          ml: 0.5,
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.4,
          color: 'text.secondary',
          wordBreak: 'break-word',
        }}
      >
        {answer.content}
      </Typography>
    </Box>
  );
}
