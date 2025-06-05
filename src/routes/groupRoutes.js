import express from 'express';
import { createGroup, deleteGroup, getUserGroups, inviteUser, joinGroupViaToken } from '../controllers/groupControllers.js';

const router = express.Router();


// Create group
router.post('/', createGroup);

// Invite user by email (generates join token)
router.post('/:groupId/invite', inviteUser);

// Join group using token
router.post('/:groupId/join', joinGroupViaToken);

// List groups for a user
router.get('/user/:userId', getUserGroups);

//Delete a group
router.delete('/:groupId', deleteGroup);

export default router
