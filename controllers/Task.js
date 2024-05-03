const express = require('express');
const Task = require('../models/taskModel');

async function createTask(req, res) {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json("Task Successfully Created");
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.status(200).json({ tasks, count: tasks.length, message: "Tasks Fetched Successfully" });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function getTaskById(req, res) {
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task, message: "Task Fetched Successfully" });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function deleteTaskById(req, res) {
    const taskId = req.params.id;

    try {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user._id
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task, message: "Task Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateTaskById(req, res) {
    const taskId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid Updates" });
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.json({
            message: "Task Updated Successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    deleteTaskById,
    updateTaskById
};