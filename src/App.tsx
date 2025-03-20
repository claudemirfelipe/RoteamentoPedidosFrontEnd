import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import RealizarPedido from './pages/RealizarPedido';
import ConsultarPedidos from './pages/ConsultarPedidos';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#dc004e', // Rosa
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/realizar-pedido" element={<RealizarPedido />} />
          <Route path="/consultar-pedidos" element={<ConsultarPedidos />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;