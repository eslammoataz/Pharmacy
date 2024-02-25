import { IMessageService } from 'Notifications/IMessage';
import { IMailTransporter } from './IMailTransporter';
import optInterface from './optInterface';


class MailSender implements IMessageService {
    private transporter: IMailTransporter;
    private mailOptions: optInterface;

    constructor(transporter: IMailTransporter) {
        this.transporter = transporter;
    }

    public set Email(value: optInterface) {
        this.mailOptions = value;
    }
    public Send() {
        return this.transporter.sendMail(this.mailOptions);
    }
}
export default MailSender;