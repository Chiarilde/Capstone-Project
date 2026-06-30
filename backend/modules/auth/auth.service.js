import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.schema.js";
import InvalidPasswordException from "../../exceptions/auth/InvalidPasswordException.js";

const { sign } = jwt;

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new InvalidPasswordException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        throw new InvalidPasswordException();
    }

    const token = sign(
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.mail,
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3s",
        },
    );
    return {
        token,
    };
};
export default login;
