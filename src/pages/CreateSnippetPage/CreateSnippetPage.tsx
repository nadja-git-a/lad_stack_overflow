import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { codeFormType, codeSchema } from './schemas/schema';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import { useCreateSnippetMutation } from '../../services/api';

export default function CreateSnippetPage() {
  const [language, setLanguage] = useState('');
  const [createSnippet, { isLoading }] = useCreateSnippetMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<codeFormType>({ resolver: zodResolver(codeSchema), mode: 'onTouched' });

  const onSubmit = async (data: codeFormType) => {
    await createSnippet({ code: data.code, language: language });
    reset();
  };
  return (
    <>
      <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        New Snippet
      </Typography>

      <Container maxWidth="sm" disableGutters>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
                placeholder="// paste or type your code here"
                {...register('code')}
                error={!!errors.code}
                helperText={errors.code?.message}
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
              disabled={isSubmitting || isLoading}
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
