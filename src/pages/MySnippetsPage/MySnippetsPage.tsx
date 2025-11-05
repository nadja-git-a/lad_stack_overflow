import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import SnippetList from '../../modules/SnippetList/SnippetList';

export default function MySnippetsPage() {
  const id = useSelector((state: RootState) => state.auth.id);
  return (
    <>
      <Typography variant="h1" color="primary" sx={{ my: 3, textAlign: 'center' }}>
        My Snippets
      </Typography>

      <SnippetList userId={id ? Number(id) : undefined} />
    </>
  );
}
