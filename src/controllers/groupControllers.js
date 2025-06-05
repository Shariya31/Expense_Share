import { TryCatch } from "../middlewares/error.js";
import jwt from 'jsonwebtoken'
import Group from "../models/Group.js";
import ErrorHandler from "../utilities/utility_class.js";
import GroupMember from '../models/GroupMember.js'
import User from "../models/User.js";
import Expense from '../models/Expense.js'
import Balance from '../models/Balance.js'
import Settlement from '../models/Settlement.js'
 

// const INVITE_SECRET = process.env.INVITE_SECRET;

export const createGroup = TryCatch(async (req, res, next) => {

    const { name, ownerId } = req.body;

    if (!name || !ownerId) return next(new ErrorHandler('Please provide name and owner id', 400))

    const group = await Group.create({ name, ownerId });

    // Adding owner as a member
    await GroupMember.create({ groupId: group._id, userId: ownerId });

    res.status(201).json({
        success: true,
        message: 'new group created successfully',
        group
    })
})

export const inviteUser = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler('User not found', 404))

    const token = jwt.sign({ groupId, userId: user._id }, process.env.INVITE_SECRET, { expiresIn: '2d' });

    const inviteLink = `http://localhost:5000/api/groups/${groupId}/join?token=${token}`;

    // Here, would be the logic for sending the link to the email.

    res.status(200).json({
        success: true,
        invitation: `Invitation sent successfully ${inviteLink}`,
        token
    })
})

export const joinGroupViaToken = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;
    const { token } = req.query;

    if (!groupId) return next(new ErrorHandler('Invalid group id', 400))

    if (!token) return next(new ErrorHandler('Invalid or expored token', 404))

    const decoded = jwt.verify(token, process.env.INVITE_SECRET);

    if (decoded.groupId !== groupId) return next(new ErrorHandler('Invalid Group', 400))

    const isAlreadyMember = await GroupMember.findOne({
        groupId,
        userId: decoded.userId
    });

    if (isAlreadyMember) return next(new ErrorHandler('Already a member', 400))

    await GroupMember.create({ groupId, userId: decoded.userId });

    res.status(200).json({
        success: true,
        message: `Joined Group Successfully`
    })
})

export const getUserGroups = TryCatch(async (req, res, next) => {

    const { userId } = req.params;

    if (!userId) return next(new ErrorHandler('Invalid userid', 400))

    const memberships = await GroupMember.find({ userId }).populate('groupId');
    const groups = memberships.map((m) => m.groupId);

    // res.json({ groups });

    res.status(200).json({
        success: true,
        message: `Group fetched successfully`,
        groups
    })
})

export const deleteGroup = TryCatch(async (req, res, next) => {

    const { groupId } = req.params;
    const requestingUserId = req.body.userId;

        const group = await Group.findById(groupId);
        // if (!group) return res.status(404).json({ error: 'Group not found' });
        if (!group) return next(new ErrorHandler('Group not found',404))

        // Check ownership
        if (group.ownerId.toString() !== requestingUserId) {
            return next(new ErrorHandler('Only group owner can delete this group', 404)) 
        }

        // Delete group and related documents
        await Promise.all([
            Group.deleteOne({ _id: groupId }),
            GroupMember.deleteMany({ groupId }),
            Expense.deleteMany({ groupId }),
            Balance.deleteMany({ groupId }),
            Settlement.deleteMany({ groupId }),
        ]);    

    res.status(200).json({
        success: true,
        message: `Group and associated data deleted successfully`
    })
})