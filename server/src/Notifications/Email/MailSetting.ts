import { SettingMailInterface } from './SettingMailInterface';

export const MailSetting: SettingMailInterface = {
    host: 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.EMAIL_PASSWORD),
    },
}