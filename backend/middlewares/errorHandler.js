import { StatusCodes } from "http-status-codes";
import { ENV } from "../config/config.js";
import { errorResponse } from "../helpers/responseHelper.js";
const errorHandler = (err, req, res) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  if (ENV === "development") {
    console.error(err);
  }

  return errorResponse(res, status, err, "Handler Error");
};

export default errorHandler;
