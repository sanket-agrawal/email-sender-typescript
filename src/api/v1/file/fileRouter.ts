import express from 'express';
import { uploadFile } from './fileController';
import { upload } from '../../../middlewares/upload';
const router = express.Router();

router.route('/upload').post(upload.single('file'),uploadFile);

export default router;