import express from 'express';
import { getUserSettlements, recordSettlement } from '../controllers/settlementControllers.js';

const router = express.Router();

// Record a settlement
router.post('/:groupId/settlements',recordSettlement);

// Get all settlements for a user
router.get('/user/:userId/settlements', getUserSettlements);

export default router