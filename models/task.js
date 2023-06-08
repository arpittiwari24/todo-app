import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const  Task = mongoose.model("Task",schema)

export default Task;