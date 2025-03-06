import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'false',
});

const limparBancoDeDados = async () => {
    try {
        await mongoose.connection.db.collection('clientes').drop()
        await mongoose.connection.db.collection('pedidos').drop()
        console.log('Banco de dados Mongo limpo');
    } catch (error) {
        console.error('Erro ao limpar banco de dados Mongo', error);
    }
};

const conectarMongoDB = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
        );
        console.log('Conectado ao MongoDB');
        await limparBancoDeDados();
    } catch (error) {
        console.error('Erro ao conectar no MongoDB', error);
    }
};

export { conectarMongoDB, sequelize };
