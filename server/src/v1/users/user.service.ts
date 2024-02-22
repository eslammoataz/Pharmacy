import UserData from './user.interface';
import { UserModel, IUser } from './user.model';
import * as bcrypt from 'bcrypt';
// import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";

class UserService {
  private User = UserModel;

  public getAllUsers = async (): Promise<IUser[]> => {
    const users = await UserModel.find();
    return users;
  };

  public createUser = async (UserData: UserData): Promise<IUser> => {
    const { password, email } = UserData;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      // throw new UserWithThatEmailAlreadyExistsException(UserData.email);
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ ...UserData, password: hashedPw });
    return newUser;
  };

  public editUser = async (
    id: string,
    updateUserData: Partial<IUser>
  ): Promise<IUser | null> => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateUserData, {
      new: true,
    });
    return updatedUser;
  };

  public deleteUser = async (id: string): Promise<boolean> => {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return !!deletedUser;
  };
}

export default UserService;
