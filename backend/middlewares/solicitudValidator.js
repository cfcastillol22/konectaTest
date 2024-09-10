import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../helpers/responseHelper.js";

const validateSolicitud = [
  body("codigo")
    .notEmpty()
    .withMessage("El código es obligatorio")
    .trim()
    .escape(),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .trim()
    .escape(),
  body("empleado_id")
    .isInt()
    .withMessage("El ID del empleado debe ser un número entero"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        errors.array(),
        "Error de validación en solicitud"
      );
    }
    next();
  },
];

export default validateSolicitud;
