import express from 'express';

import sequelize from './src/config/database.js';
import inserirDados from './src/config/dadosMock.js';

import clienteRoute from './src/routes/clienteRoutes.js'
import pedidoRoutes from './src/routes/pedidoRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoutes)

sequelize.sync({ force: false })
  .then(async () => {
    inserirDados()

    app.listen(port, () => {
      console.log(`App rodando na porta ${port}: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar e inserir dados:', error);
  });
