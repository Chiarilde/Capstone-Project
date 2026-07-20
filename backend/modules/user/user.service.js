import User from "../user/user.schema.js";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
    const { firstName, lastName, email, password, companyName } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        companyName,
    });

    return user;
};

export const getUsers = async () => {
    return await User.find().select("-password");
};

export const getUserById = async (userId) => {
    return await User.findById(userId)
        .select("-password")
        .populate("favorites");
};

export const updateUser = async (userId, data) => {
    return await User.findByIdAndUpdate(userId, data, {
        new: true,
    }).select("-password");
};

export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

export const getFavorites = async (userId) => {
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
        throw new Error("User not found");
    }

    const favorites = user.favorites.map((favorite) => favorite._id);

    return favorites;
};

export const addFavorite = async (userId, venueId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            $addToSet: {
                favorites: venueId,
            },
        },
        {
            new: true,
        },
    ).populate("favorites");
};

export const removeFavorite = async (userId, venueId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                favorites: venueId,
            },
        },
        {
            new: true,
        },
    ).populate("favorites");
};
