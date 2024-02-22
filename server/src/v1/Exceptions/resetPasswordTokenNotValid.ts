import HttpException from "./HttpException";

class resetPasswordTokenNotValid extends HttpException {
    constructor() {
        super(400, `Token not valid maybe expired`);
    }
}

export default resetPasswordTokenNotValid;