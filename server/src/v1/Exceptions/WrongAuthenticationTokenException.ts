
import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, `Wrong Auuthenticatin Token`);
    }
}

export default WrongAuthenticationTokenException;