
import HttpException from "./HttpException";

class NotAllowedToDoThisAction extends HttpException {
    constructor() {
        super(403, `You do not have permission to perform this action`);
    }
}

export default NotAllowedToDoThisAction;