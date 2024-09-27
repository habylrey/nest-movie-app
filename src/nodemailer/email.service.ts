import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,  
          pass: process.env.MAILTRAP_PASS,  
      },
    });
  }

  async sendPasswordChangedEmail(email: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Movies by habylrey👻" <from@example.com>',
      to: email,
      subject: 'Password Changed',
      text: `Dear user, 
      Your password has been changed successfully.`,
    });
  }
}