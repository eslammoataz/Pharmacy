
import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(id: string) {
        super(404, `User with email ${id} already exist`);
    }
}

export default UserWithThatEmailAlreadyExistsException;