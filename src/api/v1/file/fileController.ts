import {Request,Response} from 'express';
import asyncHandler from 'express-async-handler';
import { FileStorage } from '../../../common/fileStorage';

const fileStorage = new FileStorage();

export const uploadFile = asyncHandler(async (req : Request, res : Response) => {
    if(!req.file){
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    const fileData = {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        base64Data: req.file.buffer.toString('base64')
    };

    fileStorage.storeFile(fileData);

    res.status(200).json({
        message: 'File uploaded successfully',
        filename: fileData.filename
    });

})