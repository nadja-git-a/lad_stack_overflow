import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { RootState } from '../../app/store';

export default function DrawerList() {
  const { isAuth, role } = useSelector((state: RootState) => state.auth);

  const pages = [
    { text: 'Home', path: '/', allowed: ['guest', 'user', 'admin'] },
    { text: 'My Account', path: '/account', allowed: ['user', 'admin'] },
    { text: 'Create Snippet', path: '/create-snippet', allowed: ['user', 'admin'] },
    { text: 'My snippets', path: '/my-snippets', allowed: ['user', 'admin'] },
    { text: 'Questions', path: '/questions', allowed: ['guest', 'user', 'admin'] },
    { text: 'Users', path: '/users', allowed: ['admin'] },
  ];
  const currentRole = isAuth ? role : 'guest';
  if (currentRole == null) return;
  const visiblePages = pages.filter((page) => page.allowed.includes(currentRole));

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {visiblePages.map(({ text, path }) => (
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
