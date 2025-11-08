import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';
import React from 'react';

import AnswersList from '../../modules/AnswersList/AnswersList';
import { Question } from '../../types/Types';

interface QuestionProps {
  question: Question;
  onOpen?: (id: string) => void;
}

export default function QuestionCard({ question, onOpen }: QuestionProps) {
  const [expanded, setExpanded] = React.useState(false);

  const { id, title, description, attachedCode, user, answers, isResolved } = question;
  const initial = user.username[0]?.toUpperCase() ?? '?';

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <Card sx={{ width: '100%', borderRadius: 3 }}>
        <CardHeader
          avatar={<Avatar>{initial}</Avatar>}
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, cursor: 'pointer' }}
              onClick={() => onOpen?.(id)}
            >
              {title}
            </Typography>
          }
          subheader={user.username}
          action={
            <Chip
              label={isResolved ? 'Resolved' : 'Open'}
              color={isResolved ? 'primary' : 'secondary'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          }
        />

        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" sx={{ mb: attachedCode ? 2 : 0 }}>
            {description}
          </Typography>

          {attachedCode && (
            <Typography
              component="pre"
              sx={{
                mt: 1,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                bgcolor: 'grey.100',
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {attachedCode}
            </Typography>
          )}
        </CardContent>

        <Accordion expanded={expanded} onChange={handleToggle}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            id="panel-header"
          ></AccordionSummary>
          <AccordionDetails>
            <AnswersList questionId={question.id} answers={answers}></AnswersList>
          </AccordionDetails>
        </Accordion>
      </Card>
    </div>
  );
}
