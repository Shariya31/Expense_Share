import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        ownerId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

const Group = mongoose.model('Group', groupSchema)
export default Group;
