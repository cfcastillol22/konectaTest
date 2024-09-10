import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../helpers/responseHelper.js";

const validateEmpleado = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .trim()
    .escape(),
  body("fecha_ingreso").isDate().withMessage("La fecha de ingreso es inválida"),
  body("salario")
    .isDecimal()
    .withMessage("El salario debe ser un número válido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        errors.array(),
        "Error de validación en empleado"
      );
    }
    next();
  },
];

export default validateEmpleado;
