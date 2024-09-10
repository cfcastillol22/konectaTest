import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/responseHelper.js";
import { StatusCodes } from "http-status-codes";
import { JWT_SECRET } from "../config/config.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "Token no proporcionado o malformado.",
        "Acceso denegado"
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "El token ha expirado.",
        "Token inválido"
      );
    }
    if (error.name === "JsonWebTokenError") {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "Token inválido.",
        "Token inválido"
      );
    }
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error al verificar el token.",
      "Error del servidor"
    );
  }
};

export default authMiddleware;
