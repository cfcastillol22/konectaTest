import Empleado from "../models/empleado.js";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../helpers/responseHelper.js";

// Obtener todos los empleados
const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    return successResponse(res, StatusCodes.OK, empleados, "Consulta exitosa");
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.errors,
      "Error al consultar los empleados"
    );
  }
};

const createEmpleado = async (req, res) => {
  const { nombre, fecha_ingreso, salario, created_by } = req.body;

  console.log({ nombre, fecha_ingreso, salario, created_by });

  try {
    const nuevoEmpleado = await Empleado.create({
      nombre,
      fecha_ingreso,
      salario,
      created_by,
    });
    return successResponse(
      res,
      StatusCodes.CREATED,
      nuevoEmpleado,
      "Empleado creado correctamente"
    );
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      "Error al crear el empleado"
    );
  }
};

const updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_ingreso, salario, created_by } = req.body;

  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return errorResponse(
        res,
        StatusCodes.NOT_FOUND,
        "Empleado no encontrado"
      );
    } else {
      await Empleado.update(
        {
          nombre,
          fecha_ingreso,
          salario,
          created_by,
        },
        {
          where: { id },
        }
      );

      const nuevoEmpleado = await Empleado.findByPk(id);

      return successResponse(
        res,
        StatusCodes.OK,
        nuevoEmpleado.toJSON(),
        "Empleado actualizado correctamente"
      );
    }
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      "Error al actualizar el empleado"
    );
  }
};
export { getAllEmpleados, createEmpleado, updateEmpleado };
