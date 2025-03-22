import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('https://localhost:44344/api/Pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  // Função para agrupar itens por área
  const agruparItensPorArea = (pedidos: Pedido[]) => {
    const itensPorArea: { [key: string]: { pedidoId: number; nome: string; quantidade: number }[] } = {};

    pedidos.forEach((pedido) => {
      pedido.itens.forEach((item) => {
        const areaNome = areasCozinha[item.area];
        if (!itensPorArea[areaNome]) {
          itensPorArea[areaNome] = [];
        }
        itensPorArea[areaNome].push({
          pedidoId: pedido.id,
          nome: item.nome,
          quantidade: item.quantidade,
        });
      });
    });

    return itensPorArea;
  };

  const itensAgrupados = agruparItensPorArea(pedidos);

  return (
    <div>
      <h2>Pedidos na Cozinha</h2>
      {Object.entries(itensAgrupados).map(([area, itens]) => (
        <div key={area}>
          <h3>Área de {area}</h3>
          <ul>
            {itens.map((item, index) => (
              <li key={index}>
                Pedido #{item.pedidoId}: {item.nome} - {item.quantidade}x
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default React.memo(PedidoList);