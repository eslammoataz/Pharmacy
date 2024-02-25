import { IMessageService } from './IMessage';

class NotificationService {
    private services: IMessageService[] = [];

    public get Services(): IMessageService[] {
        return this.services;
    }

    public set Services(services: IMessageService[]) {
        this.services = services;
    }

    public Notify(): void {
        this.services.forEach(async service => service.Send());
    }
}


export default NotificationService