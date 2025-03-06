import mongoose from 'mongoose';

const pedido = new mongoose.Schema({
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    data_pedido: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});

const PedidoMg = mongoose.model('Pedido', pedido);

export default PedidoMg;