import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { useCreateSnippetMutation } from '../../services/api';

export default function CreateSnippetPage() {
  const [language, setLanguage] = React.useState('');
  const [code, setCode] = React.useState('');
  const [createSnippet] = useCreateSnippetMutation();

  const handleChangeLanguage = (e: any) => setLanguage(e.target.value);
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
            <FormControl fullWidth>
              <InputLabel id="language">Language</InputLabel>
              <Select
                labelId="language"
                id="language-select"
                label="Language"
                value={language}
                onChange={handleChangeLanguage}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C/C++">C/C++</MenuItem>
                <MenuItem value="C#">C#</MenuItem>
                <MenuItem value="Go">Go</MenuItem>
                <MenuItem value="Kotlin">Kotlin</MenuItem>
                <MenuItem value="Ruby">Ruby</MenuItem>
              </Select>
            </FormControl>

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
