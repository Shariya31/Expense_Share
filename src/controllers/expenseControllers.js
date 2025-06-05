import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utilities/utility_class.js";
import Balance from '../models/Balance.js'
import Expense from '../models/Expense.js'

export const createExpense = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;
    const { title, amount, payerId, participants } = req.body;

    if (!title || !amount || !payerId || !participants) return next(new ErrorHandler('Please provide all the details', 400))

    const share = amount / participants?.length;
    const sharePerUser = {};

    participants.forEach((userId) => {
        sharePerUser[userId] = share;
    });

    // Save expense
    const expense = await Expense.create({
        groupId,
        title,
        amount,
        payerId,
        participants,
        sharePerUser
    });

    // Update balances for each participant
    for (const userId of participants) {
        if (userId === payerId) continue;

        // A owes B = +ve balance from A to B
        await Balance.findOneAndUpdate(
            { groupId, userA: userId, userB: payerId },
            { $inc: { balance: share } },
            { upsert: true, new: true }
        );

        // And the reverse (payer is owed)
        await Balance.findOneAndUpdate(
            { groupId, userA: payerId, userB: userId },
            { $inc: { balance: -share } },
            { upsert: true, new: true }
        );
    }

    res.status(201).json({
        success: true,
        message: `Expense Created`,
        expense
    })
})

export const getGroupExpenses = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;

    if (!groupId) return next(new ErrorHandler('Group does not exist', 404))

    const expenses = await Expense.find({ groupId }).populate('payerId participants', 'email');

    res.status(200).json({
        success: true,
        message: `Fetched group expesnes successfully`,
        expenses
    })
})

export const getGroupBalances = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;

    if (!groupId) return next(new ErrorHandler('Group does not exist', 404))

    const balances = await Balance.find({ groupId }).populate('userA userB', 'email name');

    res.status(200).json({
        success: true,
        message: `Balance fetched successfully`,
        balances
    })
})