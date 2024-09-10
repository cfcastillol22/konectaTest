import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../helpers/responseHelper.js";

const validateRegister = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("El email debe ser un email válido")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        errors.array(),
        "Error de validación en register"
      );
    }
    next();
  },
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("El email debe ser un email válido")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        errors.array(),
        "Error de validación en login"
      );
    }
    next();
  },
];

export { validateRegister, validateLogin };
