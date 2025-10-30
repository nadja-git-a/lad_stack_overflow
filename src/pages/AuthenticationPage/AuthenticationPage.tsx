import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

import LoginForm from '../../modules/LoginForm/LoginForm';
import RegistrationForm from '../../modules/RegistrationForm/RegistrationForm';

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {isLogin ? (
        <>
          <LoginForm />
          <Typography variant="body2" color="secondary" sx={{ mt: 2 }}>
            Don’t have an account?
          </Typography>
          <Button color="secondary" onClick={toggleForm}>
            Sign up
          </Button>
        </>
      ) : (
        <>
          <RegistrationForm />
          <Typography variant="body2" color="secondary" sx={{ mt: 2 }}>
            Already have an account?
          </Typography>
          <Button color="secondary" onClick={toggleForm}>
            Log in
          </Button>
        </>
      )}
    </div>
  );
}
