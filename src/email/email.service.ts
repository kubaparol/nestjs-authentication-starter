import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to the app!',
      template: 'welcome',
      context: {
        name,
      },
    });
  }
}
