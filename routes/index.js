const express = require('express');
const Auth = require('../controllers/Auth');
const auth = require('../middleware/authMid');
const TaskController = require('../controllers/Task');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HomePage!');
});

router.post('/signup', Auth.signUp);
router.post('/signin', Auth.signIn);
router.get('/signout', Auth.signOut);

router.post('/new-task', auth, TaskController.createTask);
router.get('/all-tasks', auth, TaskController.getTasks);
router.get('/tasks/:id', auth, TaskController.getTaskById);
router.patch('/update-task/:id', auth, TaskController.updateTaskById);
router.delete('/delete-task/:id', auth, TaskController.deleteTaskById);


module.exports = router;