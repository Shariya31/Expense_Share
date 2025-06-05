import  mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 } 
});

balanceSchema.index({ groupId: 1, userA: 1, userB: 1 }, { unique: true });

const Balance = mongoose.model('Balance', balanceSchema)

export default Balance