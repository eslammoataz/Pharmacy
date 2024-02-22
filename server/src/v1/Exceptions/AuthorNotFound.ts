import HttpException from './HttpException';

class AuthorNotFound extends HttpException {
  constructor(email: any) {
    super(404, `Author with that ${email} not found`);
  }
}

export default AuthorNotFound;
