import express from 'express';
import emailRoutes from './email/emailRouter';
import fileRouter from './file/fileRouter';
import senderRouter from './sender/senderRouter';

const router = express.Router();

router.use('/email',emailRoutes);
router.use('/file',fileRouter);
router.use('/sender',senderRouter);

export default router;