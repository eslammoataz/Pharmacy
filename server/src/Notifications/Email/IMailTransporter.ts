export interface IMailTransporter {
    sendMail(mailOptions: any): Promise<any>;
}
