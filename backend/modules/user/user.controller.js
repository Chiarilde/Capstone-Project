import * as userService from "../user/user.service.js";

export const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);

        res.status(200).json({
            message: "User deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const favorites = await userService.getFavorites(req.user.id);

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const user = await userService.addFavorite(
            req.body.userId,
            req.body.venueId,
        );

        res.status(200).json({
            message: "Added to favorites",
            favorites: user.favorites,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const user = await userService.removeFavorite(
            req.body.userId,
            req.params.venueId,
        );

        res.status(200).json({
            message: "Removed from favorites",
            favorites: user.favorites,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
