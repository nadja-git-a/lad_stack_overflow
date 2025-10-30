import { Typography } from '@mui/material';

import SnippetList from '../../modules/SnippetList/SnippetList';

export default function HomePage() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          gap: '10px',
        }}
      >
        <Typography variant="h1" color="primary">
          Welcome to Codelang!
        </Typography>
        <SnippetList></SnippetList>
      </div>
    </>
  );
}
