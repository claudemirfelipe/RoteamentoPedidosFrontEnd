//aa
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPedidos } from '../services/api';

interface Item {
  nome: string;
  quantidade: number;
  area: number;
}

interface Pedido {
  id: number;
  itens: Item[];
}

// Mapeamento das áreas da cozinha
const areasCozinha: { [key: number]: string } = {
  0: 'Frituras',
  1: 'Grelhados',
  2: 'Saladas',
  3: 'Bebidas',
  4: 'Sobremesas',
};

const ConsultarPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  // Agrupar pedidos por área
  const pedidosPorArea: { [key: string]: { id: number; itens: Item[] }[] } = {};

  pedidos.forEach((pedido) => {
    pedido.itens.forEach((item) => {
      const areaNome = areasCozinha[item.area];
      if (!pedidosPorArea[areaNome]) {
        pedidosPorArea[areaNome] = [];
      }
      // Verifica se o pedido já foi adicionado
      const pedidoExistente = pedidosPorArea[areaNome].find((p) => p.id === pedido.id);
      if (pedidoExistente) {
        pedidoExistente.itens.push(item); // Adiciona o item ao pedido existente
      } else {
        pedidosPorArea[areaNome].push({
          id: pedido.id,
          itens: [item], // Cria um novo pedido
        });
      }
    });
  });

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
        Consultar Pedidos
      </Typography>
      <Paper sx={{ p: 3 }}>
        {Object.entries(pedidosPorArea).map(([area, pedidosArea]) => (
          <div key={area}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}
            >
              Área de {area}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '100px', textAlign: 'center' }}>Pedido</TableCell>
                  <TableCell sx={{ width: '300px' }}>Item</TableCell>
                  <TableCell sx={{ width: '100px', textAlign: 'center' }}>Quantidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidosArea.map((pedido) => (
                  <React.Fragment key={pedido.id}>
                    <TableRow>
                      <TableCell rowSpan={pedido.itens.length} sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        {pedido.id}
                      </TableCell>
                      <TableCell>{pedido.itens[0].nome}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{pedido.itens[0].quantidade}</TableCell>
                    </TableRow>
                    {pedido.itens.slice(1).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{item.quantidade}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </Paper>
    </Container>
  );
};

export default React.memo(ConsultarPedidos);