//aa
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkApiAvailability } from '../services/api';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyApi = async () => {
      const isAvailable = await checkApiAvailability();
      setApiAvailable(isAvailable);
    };

    // Verifica a API imediatamente ao carregar a página
    verifyApi();

    // Configura um intervalo para verificar a API a cada 5 segundos
    const interval = setInterval(verifyApi, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema de Pedidos Restaurante
        </Typography>

        {apiAvailable === false && (
          <Alert severity="error" sx={{ mb: 2 }}>
            O Sistema não está disponível no momento.
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          onClick={() => navigate('/realizar-pedido')}
          disabled={!apiAvailable} // Desabilita o botão se a API não estiver disponível
        >
          Realizar Pedido
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/consultar-pedidos')}
          disabled={!apiAvailable} // Desabilita o botão se a API não estiver disponível
        >
          Consultar Pedidos
        </Button>
      </Paper>
    </Container>
  );
};

export default React.memo(Home);