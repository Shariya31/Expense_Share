import express from 'express';
import { createExpense, getGroupBalances, getGroupExpenses } from '../controllers/expenseControllers.js';

const router = express.Router();

// Create a new expense
router.post('/:groupId/expenses', createExpense);

// Get all expenses in a group
router.get('/:groupId/expenses', getGroupExpenses);

// Get balance sheet of a group
router.get('/:groupId/balances', getGroupBalances);

export default router