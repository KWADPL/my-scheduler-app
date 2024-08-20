// src/App.js
import React from 'react';
import SchedulerComponent from './SchedulerComponent';
import { CssBaseline, Container, Typography, AppBar, Toolbar } from '@mui/material';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kalendarz Wydarzeń</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <SchedulerComponent />
      </Container>
    </div>
  );
};

export default App;
