import authService from "./auth.service.js";

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        const { token, user } = await authService.login(email, password);

        response.header("authorization", token).status(200).send({
            statusCode: 200,
            message: "Login successfully",
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (request, response, next) => {
    try {
        const { firstName, lastName, email, password } = request.body;

        const user = await authService.register({
            firstName,
            lastName,
            email,
            password,
        });

        response.status(201).send({
            statusCode: 201,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const googleLogin = async (request, response, next) => {
    try {
        const { idToken } = request.body;

        const { token, user } = await authService.googleAuth(idToken);

        response.status(200).send({
            statusCode: 200,
            message: "Google login successful",
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
};
