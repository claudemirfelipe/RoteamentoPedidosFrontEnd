//aa
import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'https://localhost:44344/api', // URL base da API
});

// Função para verificar se a API está disponível
export const checkApiAvailability = async () => {
  try {
    await api.get('/Pedidos'); // Endpoint simples para verificar disponibilidade
    return true; // API está disponível
  } catch (error) {
    console.error('API não disponível:', error);
    return false; // API não está disponível
  }
};

// Funções para chamadas à API
export const getPedidos = async () => {
  const response = await api.get('/Pedidos');
  return response.data;
};

export const postPedido = async (pedido: any) => {
  const response = await api.post('/Pedidos', pedido);
  return response.data;
};

export default api;