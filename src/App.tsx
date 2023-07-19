import React from 'react';
import { Container, Typography } from '@mui/material';
import Bookshelf from './components/Bookshelf';

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {/* My Bookshelf */}
      </Typography>
      <Bookshelf />
    </Container>
  );
};

export default App;
