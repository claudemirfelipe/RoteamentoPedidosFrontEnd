export interface Item {
  nome: string;
  quantidade: number;
  area: number;
}

export interface Pedido {
  id: number;
  itens: Item[];
}