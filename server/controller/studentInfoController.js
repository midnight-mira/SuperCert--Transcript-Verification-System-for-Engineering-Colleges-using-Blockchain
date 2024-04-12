const studentInfo = require('../model/studentInfoModel');
const asyncHandler = require('express-async-handler')

const getInfo = asyncHandler(async(req, res) => {
  const info = await studentInfo.find().sort({ createdAt: -1 })
  res.status(200).json(info)
})

const createInfo =asyncHandler(async (req, res) => {
  console.log("the request body is", req.body)
  const {name , email, batch, dept, CID} = req.body
  if( !name || !email || !batch || !dept|| !CID){
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const info = await studentInfo.create({
    name, email, batch, dept, CID
  })

  res.status(200).json(info)
})

module.exports = {createInfo, getInfo}


