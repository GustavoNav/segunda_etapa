import mongoose from 'mongoose';

const cliente = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

const ClienteMg = mongoose.model('Cliente', cliente);

export default ClienteMg;
