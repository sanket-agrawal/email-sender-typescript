export const jobApplicationEmailTemplate = ({
    recruiterName = "Sir/Madam",
    candidateName = "Sanket Agrawal",
    contactInformation = "+91-7387391619"
  }: {
    recruiterName?: string;
    candidateName?: string;
    contactInformation?: string;
  }): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Job Application</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #000; line-height: 1.5; margin: 0; padding: 20px;">
  
      <p>Dear ${recruiterName},</p>
  
      <p>I hope this email finds you well. My name is ${candidateName}, and I am currently working as a Full Stack Developer at Ataloud Technologies with over 2 years of experience in technologies such as Node.js, Express, MongoDB, PostgreSQL, TypeScript, Java, and Spring Boot.</p>
  
      <p>I am reaching out to inquire about potential job opportunities that may align with my skills and experience. I have attached my resume for your review and consideration.</p>
  
      <p>I would be grateful for the opportunity to discuss any relevant openings. Thank you for your time and consideration.</p>
  
      <p>Sincerely,<br>
         ${candidateName}<br>
         ${contactInformation}</p>
  
    </body>
    </html>
    `;
  }
  