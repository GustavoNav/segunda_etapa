import express from 'express';

import { sequelize, conectarMongoDB } from './src/config/database.js';
import { inserirDadosPg, inserirDadosMg } from './src/config/dadosMock.js';

import clienteRoute from './src/routes/clienteRoutes.js';
import pedidoRoutes from './src/routes/pedidoRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoutes);

Promise.all([sequelize.authenticate(), conectarMongoDB()])
  .then(async () => {
    await sequelize.sync({ force: true });
    
    inserirDadosPg();
    inserirDadosMg();

    app.listen(port, () => {
      console.log(`App rodando na porta ${port}: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar aos bancos de dados:', error);
  });
