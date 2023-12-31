import nodemailer from "nodemailer";
import { Response } from 'express';

export default async (email: string, subject: string, text: string, res: Response): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    // logger: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const sendEmail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });

    return (sendEmail.accepted && sendEmail.accepted.length > 0)
  } catch (err) {
    console.log(err.message);
    return false
  }
};
