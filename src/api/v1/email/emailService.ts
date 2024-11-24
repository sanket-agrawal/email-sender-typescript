import nodemailer from 'nodemailer';
import { config } from '../../../common/config';
import { FileData } from '../../../common/fileStorage';

interface AttachmentOptions {
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
}

interface EmailOptions{
    to:string,
    subject:string,
    text?:string,
    html:string,
    attachments? : any[]
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

    async sendEmailWithAttachment(
        options : EmailOptions,
        fileData : FileData
    ) : Promise <void>{
        const emailOptions = {
            from: `Sanket Agrawal ${config.smtp.user}`,
                ...options,
                attachments: [
                    {
                        filename: fileData.filename,
                        content: Buffer.from(fileData.base64Data, 'base64'),
                        contentType: fileData.contentType,
                    },
                ],
        };

        const result = await this.transporter.sendMail(emailOptions);
        console.log('Email sent with attachment:', result.messageId);
    }
    
}