// src/App.js
import React, { useState } from 'react';
import {
  Container, CssBaseline, Typography, Switch, FormControlLabel
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
import { UserProvider } from './context/UserContext';
import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import api from './api';

const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [mode, setMode] = useState('light');

  const handleThemeToggle = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleClaim = async (userId) => {
    try {
      await api.post(`/claim/${userId}`);
    } catch (err) {
      console.error('Error claiming points:', err.message);
    }
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <UserProvider>
        <Container maxWidth="md" sx={{ pt: 5 }}>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={handleThemeToggle} />}
            label={mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            sx={{ float: 'right' }}
          />
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            🏅 Real-Time Leaderboard App
          </Typography>
          <UserSelector
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            onClaim={handleClaim}
          />
          <Leaderboard />
        </Container>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
