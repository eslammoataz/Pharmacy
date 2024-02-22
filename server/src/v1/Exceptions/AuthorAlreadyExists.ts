import HttpException from './HttpException';

class AuthorAlreadyExists extends HttpException {
  constructor(email: string) {
    super(404, `Author with that ${email} Exists`);
  }
}

export default AuthorAlreadyExists;
