import express from 'express';
import emailRoutes from './email/emailRouter';

const router = express.Router();

router.use('/email',emailRoutes);

export default router;