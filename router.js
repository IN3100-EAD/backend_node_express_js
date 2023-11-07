import express from 'express';
const router = express.Router();
import inventoryRoutes from './routes/inventory.js';

router.use('/inventory', inventoryRoutes);

export default router;
