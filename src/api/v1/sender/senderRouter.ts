import express from 'express';
import { SenderController } from './senderController';
import { upload } from '../../../middlewares/upload';

const router = express.Router();

const senderController = new SenderController();

router.route('/execute').post(upload.single('file'),senderController.sender);

export default router;