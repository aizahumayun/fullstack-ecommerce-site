//use multer to handle multipart/form-data for file uploads
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
});