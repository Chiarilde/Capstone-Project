import express from "express";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../user/user.controller.js";

const router = express.Router();

router.post("/register", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/favorites", getFavorites);

router.post("/favorites", addFavorite);

router.delete("/favorites/:venueId", removeFavorite);

export default router;
