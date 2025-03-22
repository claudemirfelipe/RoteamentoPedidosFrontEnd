import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PedidoForm from '../components/PedidoForm';
import { postPedido, checkApiAvailability } from '../services/api';

const RealizarPedido: React.FC = () => {
  const [mensagem, setMensagem] = useState('');
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (itens: { item: string; quantidade: number }[]) => {
    if (!apiAvailable) {
      setMensagem('A API não está disponível no momento.');
      return;
    }

    try {
      const pedido = itens.map((item) => ({
        nome: item.item,
        quantidade: item.quantidade,
        area: 0, // Defina a área correta conforme necessário
      }));
      const response = await postPedido(pedido);
      setMensagem(`Pedido #${response.id} enviado para a cozinha.`);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      setMensagem('Erro ao realizar pedido. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Voltar para a Home
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Realizar Pedido
      </Typography>
      <Paper sx={{ p: 3 }}>
        {apiAvailable === false && (
          <Alert severity="error" sx={{ mb: 2 }}>
            O Sistema não está disponível no momento.
          </Alert>
        )}
        <PedidoForm onSubmit={handleSubmit} disabled={!apiAvailable} />
        {mensagem && <p>{mensagem}</p>}
      </Paper>
    </Container>
  );
};

export default React.memo(RealizarPedido);