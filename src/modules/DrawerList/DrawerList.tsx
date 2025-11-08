import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { RootState } from '../../app/store';

export default function DrawerList() {
  const { isAuth, role } = useSelector((state: RootState) => state.auth);

  type Role = 'admin' | 'user' | 'guest';

  const ROUTES = {
    home: '/',
    myAccount: '/account',
    createSnippet: '/create-snippet',
    mySnippets: '/my-snippets',
    questions: '/questions',
    users: '/users',
  } as const;

  const ROLES = {
    admin: 'admin',
    user: 'user',
    guest: 'guest',
  } as const;

  const pages: { text: string; path: string; allowed: Role[] }[] = [
    { text: 'Home', path: ROUTES.home, allowed: [ROLES.guest, ROLES.user, ROLES.admin] },
    { text: 'My Account', path: ROUTES.myAccount, allowed: [ROLES.user, ROLES.admin] },
    { text: 'Create Snippet', path: ROUTES.createSnippet, allowed: [ROLES.user, ROLES.admin] },
    { text: 'My snippets', path: ROUTES.mySnippets, allowed: [ROLES.user, ROLES.admin] },
    { text: 'Questions', path: ROUTES.questions, allowed: [ROLES.guest, ROLES.user, ROLES.admin] },
    { text: 'Users', path: ROUTES.users, allowed: [ROLES.admin] },
  ];
  const currentRole = isAuth ? role || ROLES.guest : ROLES.guest;
  if (currentRole == null) return;
  const visiblePages = pages.filter((page) => page.allowed.includes(currentRole as Role));

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
