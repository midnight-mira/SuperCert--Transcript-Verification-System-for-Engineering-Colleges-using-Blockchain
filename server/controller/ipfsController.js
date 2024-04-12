const axios = require("axios");
require('dotenv').config({ path: __dirname + '../../.env' });
const FormData = require("form-data");
const fs = require("fs");
const JWT = process.env.PINATA_JWT;
const files = require('../model/ipfsModel')
const asyncHandler = require('express-async-handler')
const docArray = [] //for generating id
console.log(JWT)
console.log(process.env.NODE_ENV)
const nodemailer = require('nodemailer')


const createFile = (Name, FileData) => {
  const id = docArray.length + 1
  const newFile = new files(id, Name, FileData)
  docArray.push(newFile)
  return newFile
}

const IpfsPinataApi = async (Name, FileData) => {

  const formData = new FormData();
  const file1 = fs.createReadStream(FileData);
  formData.append("file", file1);
  const pinataMetadata = JSON.stringify({
    name: Name,
  });

  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", pinataOptions);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );
  console.log(res.data);
  const vari = res.data.IpfsHash
  return vari
}

const createFileMain = asyncHandler(async (req, res) => {
  console.log("the requested body is", req.body)
  console.log(req.body);
  console.log(req.file);
  const Name = req.body.name
  const filepath = `../server/uploads/${Name}`
  if (filepath) {
    console.log("fine")
  }

  /* const { file } = req.file
   const { name } = req.body
   if (!file) {
     console.log("empty")
   }
   if (!name) {
     res.status(400)
     console.log("All fields are mandatory")
   }*/

  const instance1 = await createFile(Name, filepath)
  const AddToPinata = await IpfsPinataApi(instance1.Name, instance1.FileData)
    .then(v => {
      //console.log(v)
      const blah = v
      vari = blah
    })
  console.log(vari)
  res.status(201).json(vari)

}

);

const sendemail = asyncHandler(async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your email',
      pass: 'your password'
    }
  });
  const userEmail = req.body.email;
  const verificationToken = req.body.hash;

  // Send email
  transporter.sendMail({
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Hash for transcript',
    html: `
    <p>Hello,</p>
      <p>This is to inform you that your transcripts have been successfully uploaded to blockchain. You are requested to save the below hash(CID) for further verification purpose. 
       ${verificationToken}</p>
      <p>Best Wishes,</p>
      <p>SHREE LR TIWARI COLLEGE OF ENGINEERING</p>
    `
  }, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send verification email');
    } else {
      console.log('Verification email sent:', info.response);
      // Save verification token in your database and associate it with the user account
      res.status(200).send('Verification email sent successfully');
    }
  });
})



module.exports = { createFileMain , sendemail}



