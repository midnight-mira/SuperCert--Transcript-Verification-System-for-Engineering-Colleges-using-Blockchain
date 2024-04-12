const express = require('express');
const router = express.Router();
const {createInfo, getInfo} = require('../controller/studentInfoController')
const verifyJWT = require('../middleware/validateTokenHandler')

//router.use(verifyJWT)

router.get('/', getInfo)

router.post('/',  createInfo)

module.exports = router;