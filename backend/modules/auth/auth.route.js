import { Router } from "express";
import { login, register, googleLogin } from "./auth.controller.js";

const auth = Router();

auth.post("/auth/login", login);
auth.post("/auth/register", register);
auth.post("/auth/google", googleLogin);

export default auth;
