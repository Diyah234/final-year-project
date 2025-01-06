const express = require('express');
const { signupUser, loginUser, listUser, getUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/list', listUser);
userRouter.get('/:id', getUser);

module.exports = userRouter