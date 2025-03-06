import express from 'express';
import getPedido from '../controllers/pedidoController.js'

const router = express.Router();

router.get('/:id', getPedido);

export default router;
