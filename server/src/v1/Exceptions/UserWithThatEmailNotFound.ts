import HttpException from './HttpException';

class UserWithThatEMailNotFound extends HttpException {
  constructor(email: string) {
    super(
      404,
      `User with email ${email} not found - you should register first`
    );
  }
}

export default UserWithThatEMailNotFound;
