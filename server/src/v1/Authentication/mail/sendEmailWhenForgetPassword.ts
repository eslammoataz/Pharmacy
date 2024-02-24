// import MailSender from '../../../Notifications/Email/EmailService';
// import NodemailerMailTransporter from '../../../Notifications/Email/emailConfig';
// import { MailSetting } from '../../../Notifications/Email/MailSetting';
// import { IIntializeMail } from '../../../Notifications/IIntializeMail';

// class sendEmailWhenForgetPassword implements IIntializeMail {
//     private readonly mailSettingProject = MailSetting
//     private token: string;
//     constructor(value: string) {
//         this.token = value;
//     }
//     public IntializeMail() {
//         const mailTransporter = new NodemailerMailTransporter(this.mailSettingProject);
//         const mailSender = new MailSender(mailTransporter);
//         mailSender.Email = {
//             from: 'sender@example.com',
//             to: 'waelelsafty07@gmail.com',
//             subject: 'Forget Password',
//             html: `<div style="color:green; font-weight:bold">Click this link ${this.token}</div>`,
//         };
//         return mailSender;

//     }
// }

// export default sendEmailWhenForgetPassword
