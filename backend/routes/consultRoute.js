const express = require('express');
const { createConsult , listConsultByEmail, listAllConsults} = require('../controllers/consultController');

const consultRouter = express.Router();

consultRouter.post('/send', createConsult)
consultRouter.get('/list/:email', listConsultByEmail)
consultRouter.get('/listall', listAllConsults);

module.exports = consultRouter