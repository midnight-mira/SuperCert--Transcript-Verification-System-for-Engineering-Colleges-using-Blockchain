// controller.js

const upload = require('./multerMiddleware');

// Route handler that uses the Multer middleware
exports.uploadFile = (req, res) => {
  // Uploaded file is available in req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.status(200).send('File uploaded successfully');
};
