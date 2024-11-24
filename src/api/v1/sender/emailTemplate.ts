import { config } from "../../../common/config";

export const jobApplicationEmailTemplate = ({
  recruiterName = "Sir/Madam",
  candidateName = config.candidateInfo.name,
  candidateContact = config.candidateInfo.contact,
  candidateEmail = config.candidateInfo.email,
  githubUrl = config.candidateInfo.gitHub, 
  linkedinUrl = config.candidateInfo.linkedin
}: {
  recruiterName?: string;
  candidateName?: string;
  candidateContact?: string;
  candidateEmail?: string,
  githubUrl?: string;
  linkedinUrl?: string;
}): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application</title>
    <style>
      body {
        font-family: "Times New Roman", Times, serif;
        color: #000;
        line-height: 1.5;
        margin: 0;
        padding: 20px;
      }
      .bold {
        font-weight: bold;
      }
      .contact-info {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>

    <p>Dear <span>${recruiterName}</span>,</p>

    <p>I hope this email finds you well. My name is <span>${candidateName}</span>, and I am currently working as a Full Stack Developer at Ataloud Technologies with over 2 years of experience in technologies such as Node.js, Express, MongoDB, PostgreSQL, TypeScript, Java, and Spring Boot.</p>

    <p>I am reaching out to inquire about potential job opportunities that may align with my skills and experience. I have attached my resume for your review and consideration.</p>

    <p>I would be grateful for the opportunity to discuss any relevant openings. Thank you for your time and consideration.</p>

    <p>Sincerely,<br>
       <span>${candidateName}</span><br>
       <span>${candidateEmail}</span><br>
       <span>${candidateContact}</span><br>
    </p>

  </body>
  </html>
  `;
}
