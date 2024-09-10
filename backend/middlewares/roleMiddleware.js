import { errorResponse } from "../helpers/responseHelper.js";
import { StatusCodes } from "http-status-codes";

const roleMiddleware = (rolesPermitidos) => (req, res, next) => {
  const { rol } = req.user;

  if (!rolesPermitidos.includes(rol)) {
    return errorResponse(
      res,
      StatusCodes.FORBIDDEN,
      "No tienes permisos para acceder a este recurso.",
      "Acceso denegado"
    );
  }

  next();
};

export default roleMiddleware;
