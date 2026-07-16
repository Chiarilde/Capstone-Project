import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../user/user.schema.js";
import InvalidPasswordException from "../../exceptions/auth/InvalidPasswordException.js";

const { sign } = jwt;

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1Hr",
        },
    );

    return { token, user };
};

const register = async ({ firstName, lastName, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email già registrata");
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};

const googleAuth = async (idToken) => {
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    if (!email) {
        throw new Error("Google account senza email");
    }

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            firstName: given_name || "Google",
            lastName: family_name || "User",
            email,
            password: "GOOGLE_AUTH",
        });
    }

    const token = sign(
        {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1Hr",
        },
    );

    return { token, user };
};

export default {
    login,
    register,
    googleAuth,
};
