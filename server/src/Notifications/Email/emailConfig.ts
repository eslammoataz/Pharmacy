import * as nodemailer from 'nodemailer';
import { IMailTransporter } from './IMailTransporter';
import { SettingMailInterface } from './SettingMailInterface';

class NodemailerMailTransporter implements IMailTransporter {
    private transporter: any;

    constructor(settingMail: SettingMailInterface) {
        this.transporter = nodemailer.createTransport(settingMail);
        this.transporter.verify().then(()=>{
            
            console.log('Connection established successfully');
        }).catch((err)=>{ 
            console.error(err);
        });
    }

    public async sendMail(mailOptions: any) {
        return await this.transporter.sendMail(mailOptions);
    }
}
export default NodemailerMailTransporter