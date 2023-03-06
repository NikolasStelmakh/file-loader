import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.scss';

const Home = lazy(() => import('./containers/Home/Home'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#192337',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      height: '32px',
      font: '14px',
      padding: '8px, 12px, 8px, 12px',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
