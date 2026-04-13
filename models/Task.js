import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
        trim: true,
        maxlength: [10, 'Title can not be more than 10 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Task = mongoose.model('Task', taskSchema)