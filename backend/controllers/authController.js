import { JWT_SECRET } from "../config/config.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../helpers/responseHelper.js";

const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, "Email ya registrado");
    }

    const newUser = await Users.create({
      nombre,
      email,
      password_hash: password,
      rol,
    });

    return successResponse(
      res,
      StatusCodes.OK,
      newUser,
      "Usuario registrado exitosamente"
    );
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      "Error al registrar el usuario"
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "Credenciales inválidas"
      );
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "Credenciales inválidas"
      );
    }

    const accessToken = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "7h" }
    );

    const data = {
      user: {
        name: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      accessToken,
    };

    return successResponse(res, StatusCodes.OK, data, "Login exitoso");
  } catch (error) {
    return errorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error,
      "Error al iniciar sesión"
    );
  }
};

export { register, login };
