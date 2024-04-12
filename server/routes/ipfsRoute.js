// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {createFileMain, sendemail} = require('../controller/ipfsController')
/*const verifyJWT = require('../middleware/validateTokenHandler')

router.use(verifyJWT)*/

router.post('/',createFileMain)
router.post('/sendemail', sendemail)

module.exports = router;
