import nodemailer from 'nodemailer';
import { config } from '../../../common/config';
import { FileData, FileStorage } from '../../../common/fileStorage';

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
    private fileStorage : FileStorage

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });

        this.fileStorage = new FileStorage();
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
        attachmentType : string
    ) : Promise <void>{
        try{
            const emailOptions = {
                from: `Sanket Agrawal ${config.smtp.user}`,
                    ...options
            };

            if(attachmentType === "resume"){
                const fileData = this.fileStorage.getFile("Sanket Agrawal.pdf");
                if (!fileData) {
                    throw new Error('File not found!');
                }
    
                emailOptions.attachments =  [
                    {
                        filename: "resume.pdf",
                        content: Buffer.from(fileData.base64Data, 'base64'),
                        contentType: fileData.contentType,
                    },
                ]
            }
            const result = await this.transporter.sendMail(emailOptions);
            console.log('Email sent with attachment:', result.messageId);
        }catch(error){
            console.log(error);
            throw new Error("Email Sending Failed with attachments");
        }
    }
    
}