import Pedido from '../models/pedido.js';

const getPedido = async (req, res) => {
    try{
        const id = req.params.id;
        const pedido = await Pedido.findByPk(id);

        if (!pedido){
            return res.status(404).json({error: 'Pedido não encontrado'});
        }
        return res.json(pedido);

    } catch (error) {
        return res.status(500).json({error: 'Erro ao buscar o pedido'});
    }
}

export default getPedido;