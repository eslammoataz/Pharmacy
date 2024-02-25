import { IUser } from 'v1/users/user.model';

export interface IIntializeMail {
  IntializeMail(user: IUser): void;
}
