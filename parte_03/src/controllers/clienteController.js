import Cliente from '../models/cliente.js';

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

export default getClientes;