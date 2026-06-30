import { Router } from "express";
import { login } from "./auth.controller.js";
const auth = Router();

auth.post("/auth/login", login);

export default auth;
