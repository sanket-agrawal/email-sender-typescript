import nodemailer from 'nodemailer';
import { config } from '../../../common/config';

interface EmailOptions{
    to:string,
    subject:string,
    text?:string,
    html:string
}

export class EmailService{
    private transporter : nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        })
    }

    async sendEmail(options:EmailOptions) : Promise<void>{
        try {
            const result = await this.transporter.sendMail({
                from:`Sanket Agrawal ${config.smtp.user}`,
                ...options,
            });
            console.log('Email Sent');
        } catch (error) {
            console.log('Exception:',error);
            throw new Error("Failed to send email");
        }
    }
    
}