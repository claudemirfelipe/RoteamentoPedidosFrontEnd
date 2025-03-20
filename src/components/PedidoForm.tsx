import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListSubheader,
  Box,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ícone de exclusão

const cardapio = {
  Frituras: ["Batata", "Mandioca", "Dadinhos de Tapioca"],
  Grelhados: ["Hamburger de Picanha", "Hamburger de Filé Mignon", "Lanche de Frango Grelhado"],
  Saladas: ["Salada Caesar", "Salada da Casa"],
  Bebidas: ["Coca", "Guaraná", "Suco de Uva", "Suco de Laranja", "Água"],
  Sobremesas: ["Sorvete de Chocolate", "Sorvete de Creme", "Sorvete de Morango"],
};

interface ItemPedido {
  item: string;
  quantidade: number;
}

interface PedidoFormProps {
  onSubmit: (itens: ItemPedido[]) => void;
  disabled?: boolean;
}

const PedidoForm: React.FC<PedidoFormProps> = ({ onSubmit, disabled }) => {
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [itemAtual, setItemAtual] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdicionarItem = () => {
    if (itemAtual && quantidadeAtual > 0) {
      // Verifica se o item já está na lista
      const itemExistenteIndex = itens.findIndex((item) => item.item === itemAtual);

      if (itemExistenteIndex !== -1) {
        // Se o item já existe, atualiza a quantidade
        const novosItens = [...itens];
        novosItens[itemExistenteIndex].quantidade += quantidadeAtual;
        setItens(novosItens);
      } else {
        // Se o item não existe, adiciona um novo item à lista
        setItens([...itens, { item: itemAtual, quantidade: quantidadeAtual }]);
      }

      // Limpa os campos e exibe o feedback
      setItemAtual('');
      setQuantidadeAtual(1);
      setSnackbarOpen(true);
    }
  };

  const handleExcluirItem = (index: number) => {
    const novosItens = itens.filter((_, i) => i !== index); // Remove o item da lista
    setItens(novosItens);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Valida se há itens na lista antes de enviar
    if (itens.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }

    onSubmit(itens);
    setItens([]); // Limpa o estado após o envio
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="item-label">Escolha o item</InputLabel>
          <Select
            labelId="item-label"
            value={itemAtual}
            onChange={(e) => setItemAtual(e.target.value as string)}
            label="Escolha o item"
            disabled={disabled}
          >
            <MenuItem value="">Selecione um item</MenuItem>
            {Object.entries(cardapio).map(([categoria, itens]) => [
              <ListSubheader key={categoria} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                {categoria}
              </ListSubheader>,
              ...itens.map((item) => (
                <MenuItem value={item} key={item} sx={{ pl: 4 }}>
                  {item}
                </MenuItem>
              )),
            ])}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Quantidade"
          value={quantidadeAtual}
          onChange={(e) => setQuantidadeAtual(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 1 }}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleAdicionarItem}
          disabled={disabled || !itemAtual || quantidadeAtual < 1}
        >
          Adicionar Item
        </Button>
      </Box>

      {itens.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h2">
            Itens do Pedido
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantidade</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleExcluirItem(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={disabled || itens.length === 0}
      >
        Realizar Pedido
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Item {itens.find((item) => item.item === itemAtual) ? 'atualizado' : 'adicionado'} com sucesso!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default React.memo(PedidoForm);