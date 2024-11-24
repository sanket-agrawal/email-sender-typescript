import express from 'express';
import { EmailController } from './emailController';
const router = express.Router();
const emailController = new EmailController();

router.route('/test-email').post(emailController.sendEmail)

export default router;