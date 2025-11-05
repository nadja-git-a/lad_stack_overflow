import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import { useCreateSnippetMutation } from '../../services/api';

export default function CreateSnippetPage() {
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [createSnippet] = useCreateSnippetMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createSnippet({ code, language });
    setCode('');
  };
  return (
    <>
      <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        New Snippet
      </Typography>

      <Container maxWidth="sm" disableGutters>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <LanguageSelect value={language} onChange={setLanguage}></LanguageSelect>

            <div>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Code
              </Typography>
              <TextField
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// paste or type your code here"
                multiline
                minRows={8}
                fullWidth
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
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
            >
              Create Snippet
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
