const express = require('express');
const { loginDoctor, listDoctor, signupDoc, getDoc } = require('../controllers/doctorController');
const multer = require('multer');

const doctorRouter = express.Router();

// Configure Multer storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


doctorRouter.post('/login', loginDoctor)
doctorRouter.post('/signup',upload.single('image'), signupDoc)
doctorRouter.get('/list', listDoctor)
doctorRouter.get('/:id', getDoc)

module.exports = doctorRouter