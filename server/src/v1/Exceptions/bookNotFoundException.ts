
import HttpException from "./HttpException";

class BookNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Book with id ${id} not found`);
    }
}

export default BookNotFoundException;