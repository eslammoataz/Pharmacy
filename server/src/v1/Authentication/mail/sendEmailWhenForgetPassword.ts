import MailSender from '../../../Notifications/Email/EmailService';
import NodemailerMailTransporter from '../../../Notifications/Email/emailConfig';
import { MailSetting } from '../../../Notifications/Email/MailSetting';
import { IIntializeMail } from '../../../Notifications/IIntializeMail';
import { IUser } from 'v1/users/user.model';

class sendEmailWhenForgetPassword implements IIntializeMail {
  private readonly mailSettingProject = MailSetting;
  private token: string;
  constructor(value: string) {
    this.token = value;
  }
  public IntializeMail(user: IUser) {
    const mailTransporter = new NodemailerMailTransporter(
      this.mailSettingProject
    );
    const mailSender = new MailSender(mailTransporter);
    mailSender.Email = {
      from: this.mailSettingProject.auth.user,
      to: user.email,
      subject: 'Forget Password',
      html: `<div style="color:green; font-weight:bold">This is your OTP copy and paste it in the ForgetPassword Page ${this.token}</div>`,
    };
    return mailSender;
  }
}

export default sendEmailWhenForgetPassword;
