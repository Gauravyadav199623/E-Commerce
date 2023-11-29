const Expenses = require('../models/expenses');
const sequelize = require('../util/database');

exports.addExpenses = async (request, response, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const user = request.user;
        const { category, amount } = request.body;

        await user.createExpense({
            category: category,
            amount: amount,
            date: date
        }, { transaction });
        const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id }, transaction });
        await user.update({ totalexpenses: totalExpenses }, { transaction });
        await transaction.commit();
        response.status(200).json({ message: 'Data successfully added' });

    } catch (error) {
        console.log(error);
        if (transaction) {
            await transaction.rollback();
        }
        response.status(500).json({ message: 'An error occurred' });
    }
}

exports.getExpenses = async (request, response, nex) => {
    try {
        const page = request.query.page;
        const user = request.user;
        const expenses = await user.getExpenses({
            offset: offset,
            limit: limit
        });
        response.status(200).json({
            expenses: expenses,
            totalexpenses: user.totalexpenses,
            hasMoreExpenses : expenses.length === limit,
            hasPreviousExpenses : page > 1
        });

    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
}
exports.deletebyId = async (request, response, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const dID = request.params.dID;
        const user = request.user;
        const result = await Expenses.destroy({ where: { id: dID, userId: request.user.id }, transaction });
        
        await transaction.commit();
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
    }
}
exports.getExpensesbyid = async (request, response, nex) => {
    try {
        const user = request.user;
        const eID = request.params.eID;
        const expense = await user.getExpenses({ where: { id: eID } });
        response.status(200).json(expense);

    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Unauthorized relogin required' });
    }
}
exports.updateExpensebyid = async (request, response, next) => {
    let transaction = await sequelize.transaction();
    try {
        const uID = request.params.uID;
        const user = request.user;
        const { category, amount } = request.body;
        const up = await Expenses.update({
            category: category,
            
            amount: amount,
            date: date
        })
        const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id } }, { transaction });
        
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
    }
}
