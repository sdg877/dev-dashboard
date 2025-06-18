const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for current user
router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// Add a new task
router.post('/tasks', auth, async (req, res) => {
  const newTask = new Task({ userId: req.user, text: req.body.text });
  await newTask.save();
  res.status(201).json(newTask);
});

// Update task
router.put('/tasks/:id', auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});

// Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
  res.json({ msg: 'Task deleted' });
});

module.exports = router;
