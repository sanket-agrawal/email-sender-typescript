import express from 'express';
import emailRoutes from './email/emailRouter';
import fileRouter from './file/fileRouter';

const router = express.Router();

router.use('/email',emailRoutes);
router.use('/file',fileRouter);

export default router;