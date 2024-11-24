import XLSX from 'xlsx';
import { Request, Response } from 'express';
import { EmailService } from "../email/emailService";
import { jobApplicationEmailTemplate } from './emailTemplate';
import { config } from '../../../common/config';

export class SenderController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  sender = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).send('No file uploaded.');
        return; 
      }

      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 

      const headers: string[] = jsonData[0] as string[];
      const rows: any[] = jsonData.slice(1);

      const formattedData = rows.map((row: any) => {
        const rowData: Record<string, any> = {}; 
        headers.forEach((header: string, index: number) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      const totalEmails = formattedData.length;
      let sentEmails = 0;

      for(const data of formattedData){
        await this.emailService.sendEmailWithAttachment({
            html : jobApplicationEmailTemplate({
                recruiterName : data.Name.split(" ")[0],
                candidateName : config.candidateInfo.name,
                contactInformation : config.candidateInfo.contact
            }),
            subject : config.mailSubjects.jobApplications,
            to : data.Email
        },"resume");
        sentEmails++;
        console.log(`${sentEmails} mails sent from ${totalEmails}`)

      }

      res.status(200).json({ message: 'Emails sent successfully', data: {
        totalMailSent : sentEmails
      } });

    } catch (ex) {
      console.log('Exception:', ex);
      res.status(400).json({
        message: "Something Went Wrong"
      });
    }
  }
}