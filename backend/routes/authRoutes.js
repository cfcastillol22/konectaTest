import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/authController.js";
import loginLimiter from "../middlewares/loginLimiter.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/authValidator.js";

router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, validateLogin, login);

export default router;
