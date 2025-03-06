import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const PedidoPg = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Clientes',
            key: 'id'
        },
        allowNull: false,
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT
    }
});

export default PedidoPg;
