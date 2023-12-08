const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/expense/get-expenses',expenseController.getExpenses)
router.post('/expense/post-expense',expenseController.postExpense)
router.delete('/expense/delete-expense/:id',expenseController.deleteExpense)


module.exports = router;
