import { Router } from "express";
import loginSchema from "../schemas/loginSchema.js";
import signupSchema from "../schemas/signupSchema.js"
import { validateSignup } from "../middlewares/signupValidade.js";
import { signUp, login } from "../controllers/authController.js";


const authRouter = Router();



authRouter.post("/auth/sign-up", validateSignup (signupSchema), signUp);
authRouter.post("/auth/login", loginSchema, login);

export default authRouter;


