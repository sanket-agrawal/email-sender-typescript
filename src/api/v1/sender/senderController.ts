import {Request, Response} from "express";
import { EmailService } from "../email/emailService";

export class SenderController {
    private emailService : EmailService;

    constructor(){
        this.emailService = new EmailService();
    };

    sender = async (req : Request, res : Response) => {
        try {
            const { to, subject, html } = req.body;

            if (!to || !subject) {
                res.status(400).json({ message: 'Missing required fields' });
            }
        
            await this.emailService.sendEmailWithAttachment(
                {
                    to,
                    subject,
                    html: html,
                },
                "resume"
            );
        
            res.status(200).json({ message: 'Emails sent successfully' });
        } catch (ex) {
            console.log('Exception:',ex);
            res.status(400).json({
                message : "Something Went Wrong"
            })
        }
    }
    
    
}