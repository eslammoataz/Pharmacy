import HttpException from "./HttpException";

class PasswordNotMatchedException extends HttpException {
    constructor() {
        super(400, `password and password confirm not matched`);
    }
}

export default PasswordNotMatchedException;