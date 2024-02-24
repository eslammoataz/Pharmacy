import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import validationMiddleware from '../Middlewares/validationMiddleware';
import CreateUserDto from '../users/dto/createUser.dto';
import User from '../../v1/users/user.interface';
import UserWithThatEmailAlreadyExistsException from '../Exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../Exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import { UserModel, IUser } from '../users/user.model';
import LogInDto from './dto/logIn.dto';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../../v1/interfaces/dataStoredInToken.interface';
import AuthenticationService from './Authentication.Service';
import UserService from '../users/user.service';
import forgetPasswordDto from './dto/forgetPassword.dto';
import * as expressAsyncHandler from 'express-async-handler';
import userForgetPasswordNotFoundException from '../Exceptions/userForgetPasswordNotFoundException';
// import sendEmailWhenForgetPassword from './mail/sendEmailWhenForgetPassword';
// import NotificationService from '../../Notifications/NotificationService';
import resetPasswordDto from './dto/resetPasswordDto';
import PasswordNotMatchedException from '../Exceptions/passwordNotMatchedException';
import resetPasswordTokenNotValid from '../Exceptions/resetPasswordTokenNotValid';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = UserModel;
  private AuthenticationService = new AuthenticationService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    // this.router.post(
    //   `${this.path}/forgetpassword`,
    //   validationMiddleware(forgetPasswordDto),
    //   this.forgetPassword
    // );
    // this.router.post(
    //   `${this.path}/resetpassword/:token`,
    //   validationMiddleware(resetPasswordDto),
    //   this.resetPassword
    // );
  }

  private createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET_KEY;
    const dataStoredInToken: DataStoredInToken = {
      _id: String(user.id),
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  } //

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      console.log(user._id);
      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      response.send(user);
    }
  };

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token};ww HttpOnly; Max-Age=${tokenData.expiresIn} Path='/'`;
  }

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ where: { email: logInData.email } });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.json({ tokenData, user });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  // private forgetPassword = expressAsyncHandler(
  //   async (
  //     request: express.Request,
  //     response: express.Response,
  //     next: express.NextFunction
  //   ) => {
  //     // TODO: Validate the email address and make sure it belongs to a registered user
  //     const emailUser: forgetPasswordDto = request.body;
  //     // TODO: Generate a unique token and save it to the user's account
  //     const { user, resetToken } =
  //       await this.AuthenticationService.saveTokenToUserAccount(
  //         emailUser.email
  //       );
  //     if (!user)
  //       return next(new userForgetPasswordNotFoundException(emailUser.email));
  //     // TODO: Send an email to the user with a link to reset their password
  //     const mailSender = new sendEmailWhenForgetPassword(
  //       resetToken
  //     ).IntializeMail();
  //     const Notify = new NotificationService();
  //     Notify.Services = [mailSender];
  //     Notify.Notify();

  //     response.send(user);
  //   }
  // );

  // private resetPassword = expressAsyncHandler(
  //   async (
  //     request: express.Request,
  //     response: express.Response,
  //     next: express.NextFunction
  //   ) => {
  //     const token = request.params.token;
  //     if (!token) return next(new resetPasswordTokenNotValid());

  //     let user = await this.AuthenticationService.checkTokenIsCorrect(token);

  //     if (!user) return next(new resetPasswordTokenNotValid());
  //     const newPassword: resetPasswordDto = request.body;
  //     const success = await this.AuthenticationService.saveNewPassword(
  //       newPassword,
  //       user
  //     );
  //     if (!success) return next(new PasswordNotMatchedException());
  //     user.password = undefined;
  //     response.send(user);
  //   }
  // );
}

export default AuthenticationController;
