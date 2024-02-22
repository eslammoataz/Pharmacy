import HttpException from './HttpException';

class userForgetPasswordNotFoundException extends HttpException {
  constructor(email: string) {
    super(404, `User with this email ${email} not found`);
  }
}

export default userForgetPasswordNotFoundException;
