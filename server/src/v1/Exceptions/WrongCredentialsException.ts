
import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException {
    constructor() {
        super(404, `Email or your password Wrong credentials`);
    }
}

export default WrongCredentialsException;