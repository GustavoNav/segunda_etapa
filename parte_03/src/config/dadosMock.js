import Cliente from '../models/cliente.js';
import Pedido from '../models/pedido.js';

async function inserirDados() {
  try {
    const clientes = await Cliente.bulkCreate([
      { nome: 'João Silva', email: 'joao.silva@example.com' },
      { nome: 'Maria Oliveira', email: 'maria.oliveira@example.com' },
      { nome: 'Carlos Souza', email: 'carlos.souza@example.com' },
    ]); 
    console.log('Clientes inseridos com sucesso!');

    const pedidos = await Pedido.bulkCreate([
      { id_cliente: clientes[0].id, data_pedido: new Date(), total: 100.50 },
      { id_cliente: clientes[1].id, data_pedido: new Date(), total: 250.75 },
      { id_cliente: clientes[2].id, data_pedido: new Date(), total: 50.30 },
    ]);
    console.log('Pedidos inseridos com sucesso!');

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}

export default inserirDados;
