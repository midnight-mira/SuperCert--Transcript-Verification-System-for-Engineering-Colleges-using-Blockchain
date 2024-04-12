const transactionInfo = require('../model/transactionInfoModel');
const asyncHandler = require('express-async-handler')

const getInfo = asyncHandler(async(req, res) => {
  const info = await transactionInfo.find().sort({ createdAt: -1 })
  res.status(200).json(info)
})

const createInfo =asyncHandler(async (req, res) => {
  console.log("the request body is", req.body)
  const {name , email, emailOfStudent, batch, CID, organizationName} = req.body
  if( !name || !email || !emailOfStudent || !batch || !CID || !organizationName){
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const info = await transactionInfo.create({
    name, email, emailOfStudent, batch, CID, organizationName
  })

  res.status(200).json(info)
})

module.exports = {createInfo, getInfo}