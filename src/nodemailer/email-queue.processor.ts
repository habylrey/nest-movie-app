import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('email')
export class EmailQueueProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('sendPasswordChangedEmail')
  async handleSendPasswordChangedEmail(job: Job<{ email: string }>) {
    const { email } = job.data;
    await this.emailService.sendPasswordChangedEmail(email);
  } 
}