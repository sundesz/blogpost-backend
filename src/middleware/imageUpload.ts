import multer from 'multer';
import { userMessage } from '../utils/userMessages';
import { FILE_SIZE_LIMIT } from '../config';

const validFileTypes = ['image/png', 'image/jpeg'];

export const profilePicUpload = multer({
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter(req, file, callback) {
    validFileTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(new Error(userMessage.error.UNACCEPTED_FILE_TYPE));
  },
});

export const featuredImageUpload = multer({
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter(req, file, callback) {
    validFileTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(new Error(userMessage.error.UNACCEPTED_FILE_TYPE));
  },
});

export const inPostImageUpload = multer({
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter(req, file, callback) {
    validFileTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(new Error(userMessage.error.UNACCEPTED_FILE_TYPE));
  },
});
