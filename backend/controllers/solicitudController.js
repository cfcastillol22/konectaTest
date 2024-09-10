import Solicitud from "../models/solicitud.js";
import Empleado from "../models/empleado.js";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../helpers/responseHelper.js";

const getAllSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({
      include: { model: Empleado, as: "empleado" },
    });
    return successResponse(
      res,
      StatusCodes.OK,
      solicitudes,
      "Solicitudes obtenidas correctamente"
    );
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      "Error al consultar las solicitudes"
    );
  }
};

const createSolicitud = async (req, res) => {
  const { codigo, descripcion, resumen, empleado_id, created_by } = req.body;

  try {
    const empleado = await Empleado.findByPk(empleado_id);
    if (!empleado) {
      return errorResponse(
        res,
        StatusCodes.NOT_FOUND,
        empleado,
        "Empleado no encontrado"
      );
    }

    const nuevaSolicitud = await Solicitud.create({
      codigo,
      descripcion,
      resumen,
      empleado_id,
      created_by,
    });

    return successResponse(
      res,
      StatusCodes.CREATED,
      nuevaSolicitud,
      "Solicitud creada exitosamente"
    );
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      "Error al crear la solicitud"
    );
  }
};

const updateSolicitud = async (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, resumen, empleado_id } = req.body;

  try {
    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return errorResponse(
        res,
        StatusCodes.NOT_FOUND,
        "Solicitud no encontrada"
      );
    }
    await Solicitud.update(
      {
        codigo,
        descripcion,
        resumen,
        empleado_id,
      },
      {
        where: { id },
      }
    );
    const nuevaSolicitud = await Solicitud.findByPk(id);

    return successResponse(
      res,
      StatusCodes.OK,
      nuevaSolicitud.toJSON(),
      "Solicitud actualizada correctamente"
    );
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      "Error al actualizar la solicitud"
    );
  }
};

const deleteSolicitud = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return errorResponse(
        res,
        StatusCodes.NOT_FOUND,
        "Solicitud no encontrada"
      );
    }

    await solicitud.destroy();
    return successResponse(
      res,
      StatusCodes.NO_CONTENT,
      solicitud,
      "Solicitud eliminada exitosamente"
    );
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.errors,
      "Error al eliminar la solicitud"
    );
  }
};

export { getAllSolicitudes, createSolicitud, deleteSolicitud, updateSolicitud };
