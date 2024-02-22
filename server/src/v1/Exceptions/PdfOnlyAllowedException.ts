
import HttpException from "./HttpException";

class PdfOnlyAllowedException extends HttpException {
    constructor() {
        super(400, `Only PDF Allowed`);
    }
}

export default PdfOnlyAllowedException;