import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function DrawerList() {
  const pages = [
    { text: 'Home', path: '/' },
    { text: 'My Account', path: '/account' },
    { text: 'Post snippet', path: '/post-snippet' },
    { text: 'My snippets', path: '/my-snippets' },
    { text: 'Questions', path: '/questions' },
    { text: 'Users', path: '/users' },
  ];
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {pages.map(({ text, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={RouterLink} to={path}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
}
