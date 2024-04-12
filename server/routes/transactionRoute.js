const express = require('express');
const router = express.Router();
const {createInfo, getInfo} = require('../controller/transactionInfoController')

router.get('/', getInfo)

router.post('/', createInfo)

module.exports = router;