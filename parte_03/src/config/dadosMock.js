import ClientePg from '../models/clientePg.js';
import PedidoPg from '../models/pedidoPg.js';
import ClienteMg from '../models/clienteMg.js';
import PedidoMg from '../models/pedidoMg.js';


async function inserirDadosPg() {
  try {
    const clientes = await ClientePg.bulkCreate([
      { nome: 'João Silva', email: 'joao.silva@example.com' },
      { nome: 'Maria Oliveira', email: 'maria.oliveira@example.com' },
      { nome: 'Carlos Souza', email: 'carlos.souza@example.com' },
    ]); 
    console.log('lientes inseridos no PostgreSQL com sucesso!');

    const pedidos = await PedidoPg.bulkCreate([
      { id_cliente: clientes[0].id, data_pedido: new Date(), total: 100.50 },
      { id_cliente: clientes[1].id, data_pedido: new Date(), total: 250.75 },
      { id_cliente: clientes[2].id, data_pedido: new Date(), total: 50.30 },
    ]);
    console.log('Pedidos inseridos no PostgreSQL com sucesso!');

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}

async function inserirDadosMg(){
  try{
      const clientesMongo = await ClienteMg.insertMany([
        { nome: 'João Silva', email: 'joao.silva@example.com' },
        { nome: 'Maria Oliveira', email: 'maria.oliveira@example.com' },
        { nome: 'Carlos Souza', email: 'carlos.souza@example.com' },
      ]);
      console.log('Clientes inseridos no MongoDB com sucesso!');
  
      const pedidosMongo = await PedidoMg.insertMany([
        { id_cliente: clientesMongo[0]._id, data_pedido: new Date(), total: 100.50 },
        { id_cliente: clientesMongo[1]._id, data_pedido: new Date(), total: 250.75 },
        { id_cliente: clientesMongo[2]._id, data_pedido: new Date(), total: 50.30 },
      ]);
      console.log('Pedidos inseridos no MongoDB com sucesso!')
  } catch (error) {
    console.error('Erro ao inserir dados no MongoDB: ', error)
  }
}

export { inserirDadosPg, inserirDadosMg };
