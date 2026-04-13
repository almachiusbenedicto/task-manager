import { Task } from "../models/Task.js"
import asyncWrapper from "../middleware/async.js"
import { createCustomError } from "../errors/custom-errors.js"


export const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json(tasks)
})

export const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json(task)
        
})

export const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        return next(createCustomError(`No task with id : ${req.params.id}`, 404))
    }
    res.status(200).json(task)
})

export const updateTask = asyncWrapper(async (req, res,next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

    if (!task) {
        return next(createCustomError(`No task with id : ${req.params.id}`, 404))
    }
    res.status(200).json(task);
})

export const deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return next(createCustomError(`No task with id : ${req.params.id}`, 404))
    }
    res.status(200).json({ message: 'Task deleted' })
})
