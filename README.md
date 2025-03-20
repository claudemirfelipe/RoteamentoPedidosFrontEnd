# Sistema de Pedidos para Restaurante

Este é um sistema de pedidos para restaurantes desenvolvido em **React** com **TypeScript** e **Material-UI**. Ele permite que os usuários realizem pedidos, consultem pedidos existentes e gerenciem itens de forma intuitiva.

---

## Funcionalidades

- **Realizar Pedidos**:
  - Selecione itens do cardápio e defina a quantidade.
  - Adicione ou atualize itens no pedido.
  - Exclua itens do pedido antes de finalizá-lo.

- **Consultar Pedidos**:
  - Visualize os pedidos agrupados por área da cozinha (Frituras, Grelhados, Saladas, etc.).
  - Veja os detalhes de cada pedido, incluindo itens e quantidades.

- **Interface Moderna**:
  - Design responsivo e intuitivo com Material-UI.
  - Feedback visual com `Snackbar` e `Alert`.

- **Integração com API**:
  - Conecta-se a uma API para enviar e receber dados de pedidos.

---

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Material-UI (MUI)
  - React Router DOM (para navegação)

- **Ferramentas**:
  - Axios (para chamadas à API)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn

### Passos para Execução

1. **Extraia o projeto**:
   - Extraia o arquivo ZIP compartilhado via ***** para uma pasta no seu computador.

2. **Instale as dependências**:
   - Abra o terminal na pasta do projeto e execute:
     npm install
     # ou
     yarn install

3. **Configure a API**:
   - Certifique-se de que a API está rodando e atualize a URL base no arquivo `src/services/api.ts`:

4. **Inicie o servidor de desenvolvimento**:
   - No terminal, execute:
     npm start

5. **Acesse o projeto**:
   - Abra o navegador e acesse `http://localhost:3000`.

---

## Estrutura do Projeto

sistema-pedidos-restaurante/
├── src/
│ ├── components/ # Componentes reutilizáveis
│ │ ├── Button.tsx
│ │ ├── Header.tsx
│ │ ├── PedidoForm.tsx
│ │ └── PedidoList.tsx
│ ├── pages/ # Páginas da aplicação
│ │ ├── Home.tsx
│ │ ├── RealizarPedido.tsx
│ │ └── ConsultarPedidos.tsx
│ ├── services/ # Serviços de API
│ │ └── api.ts
│ ├── types/ # Tipos TypeScript
│ │ └── Pedido.ts
│ ├── App.tsx # Componente principal
│ └── index.tsx # Ponto de entrada
├── public/ # Arquivos estáticos
├── package.json # Dependências e scripts
├── tsconfig.json # Configuração do TypeScript
└── README.md # Documentação do projeto

---

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- **Nome**: [Claudemir Aparecido Felipe]
- **E-mail**: [claudemirfelipe@gmail.com]