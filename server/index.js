const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")
const docIpfs = require('./routes/ipfsRoute')
const studentInfo = require('./routes/studentInfoRoute')
const transactionInfo = require('./routes/transactionRoute')
const userRoute = require('./routes/userRoute')
const multer = require('multer');
const bodyParser = require('body-parser');


// Define the storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Use the provided name if available, otherwise use the original filename
    const providedName = req.body.name;
    const filename = providedName ? providedName : file.originalname;
    cb(null, filename);
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });


connectDb()
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow credentials (cookies)
}))
const port = 5001
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/ipfsDocs', upload.single("file"), docIpfs)
app.use('/studentInfo', studentInfo)
app.use('/transactionInfo', transactionInfo)
app.use('/user', userRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



