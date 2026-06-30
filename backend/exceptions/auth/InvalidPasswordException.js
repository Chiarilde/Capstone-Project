import HttpException from "../index.js";

class InvalidPasswordException extends HttpException {
    constructor(
        message = "Incorrect credentials",
        statusCode = 401,
        error = "The provided credentials are not valid! Please try again.",
    ) {
        super(message, statusCode, error);
    }
}
export default InvalidPasswordException;
