// routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controller/bakwasController');

// Import the Multer middleware
const upload = require('./multerMiddleware');

// Route handler that uses the controller and Multer middleware
router.post('/', upload.single('file'), controller.uploadFile);

module.exports = router;