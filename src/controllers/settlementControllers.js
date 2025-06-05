import { TryCatch } from "../middlewares/error.js";
import Settlement from '../models/Settlement.js'
import Balance from "../models/Balance.js";
import ErrorHandler from "../utilities/utility_class.js";
export const recordSettlement = TryCatch(async (req, res, next) => {
    const { groupId } = req.params;
    const { payerId, payeeId, amount } = req.body;

    if (!payeeId || !payeeId, !amount) return next(new ErrorHandler('Please provide all the details', 404))

    // Save settlement
    const settlement = await Settlement.create({
        groupId,
        payerId,
        payeeId,
        amount,
    });

    // Update balances (payer owes payee less now)
    await Balance.findOneAndUpdate(
        { groupId, userA: payerId, userB: payeeId },
        { $inc: { balance: -amount } },
        { upsert: true, new: true }
    );

    // Also reverse balance
    await Balance.findOneAndUpdate(
        { groupId, userA: payeeId, userB: payerId },
        { $inc: { balance: amount } },
        { upsert: true, new: true }
    );

    res.status(201).json({
        success: true,
        message: 'Settlement recorded',
        settlement
    })
})

export const getUserSettlements = TryCatch(async (req, res, next) => {

    const { userId } = req.params;

    if (!userId) return next(new ErrorHandler('Invalid user id || User does not exist', 400))

    const settlements = await Settlement.find({
        $or: [{ payerId: userId }, { payeeId: userId }],
    })
        .populate('payerId payeeId groupId', 'email name');


    res.status(200).json({
        success: true,
        message: `Fetched all the user settlements`,
        settlements
    })
})