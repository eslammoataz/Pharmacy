const mongoose = require('mongoose');
import { UserModel, IUser } from '../users/user.model';
import * as crypto from 'crypto';
import { db } from '../../DBConfig';
import * as bcrypt from 'bcrypt';

import resetPasswordDto from './dto/resetPasswordDto';
class AuthenticationService {
  private User = UserModel;

  public generateToken = async () => {
    const reset = crypto.randomBytes(32).toString('hex');

    const tokenDatabase = crypto
      .createHash('sha256')
      .update(reset)
      .digest('hex');
    const passwordResetExpire = Date.now() + 10 * 60 * 1000;
    const date = new Date(passwordResetExpire);

    return { tokenDatabase, reset, date };
  };

  public saveTokenToUserAccount = async (emailUser: string) => {
    let user, resetToken;
    const session = await db.startSession();

    try {
      await session.startTransaction();

      user = await UserModel.findOne({ email: emailUser }).session(session);

      if (user) {
        user.password = undefined;
        const { reset, tokenDatabase, date } = await this.generateToken();
        resetToken = reset;
        await user
          .updateOne({ token: tokenDatabase, passwordResetExpire: date })
          .session(session);
      }

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return { user, resetToken };
    } catch (error) {
      console.error('Error in saveTokenToUserAccount:', error);
      await session.abortTransaction(); // Rollback the transaction if an error occurs
      session.endSession();
      throw error;
    }
  };

  public checkTokenIsCorrect = async (token: string) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await UserModel.findOne({
      token: hashedToken,
      passwordResetExpire: { $gt: new Date() },
    });
    return user;
  };

  public saveNewPassword = async (
    newPassword: resetPasswordDto,
    user: IUser // Assuming IUser is your Mongoose user interface
  ) => {
    if (newPassword.password !== newPassword.passwordConfirm) return false;
    const hashedPassword = await bcrypt.hash(newPassword.password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword, token: null, passwordResetExpire: null },
      { new: true }
    );
    return updatedUser;
  };
}

export default AuthenticationService;
