import express from 'express';

import Transaction from './controllers';

const router = express.Router();

router.get('/ballance', Transaction.getBallance);
router.get('/transaction/:id', Transaction.getById);
router.get('/transaction', Transaction.getAll);
router.post('/transaction', Transaction.create);

export default router;