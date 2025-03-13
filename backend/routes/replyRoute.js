const express = require('express');
const { createReply } = require('../controllers/ReplyController');

const replyRouter = express.Router();

replyRouter.post('/send', createReply)

module.exports = replyRouter 