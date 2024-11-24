import {Request, Response, NextFunction} from 'express';
import { EmailService } from './emailService';


export class EmailController{
    private EmailService : EmailService;

    constructor(){
        this.EmailService = new EmailService();
    };

    sendEmail = async (req : Request, res : Response) => {
        try {
            await this.EmailService.sendEmail(req.body);
            res.status(200).json({
                message : "Email Sent Sucessfully!",
            });
        } catch (ex) {
            console.log('Exception :',ex);
            res.status(400).json({
                message : "Something Went Wrong"
            });
        }
    }
}