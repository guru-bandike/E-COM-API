import multer from 'multer';

// Define multer storage Configuration
const storageConfig = multer.diskStorage({
  // Set destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  // Set file name for uploaded files
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);

  },
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    req.isFileRejected = true;
    cb(null, false);
  }
}

// Create Multer instance with storage cofiguration and Export as default
export const uploadImage = multer({ storage: storageConfig, fileFilter });
