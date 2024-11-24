import express from 'express';
import { SenderController } from './senderController';

const router = express.Router();

const senderController = new SenderController();

router.route('/execute').post(senderController.sender);

export default router;