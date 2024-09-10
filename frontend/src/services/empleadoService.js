import axios from "axios";
import { getToken as token, getLoggedUserId } from "./authService";

export const getEmpleado = async () => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_EMPLEADOS, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error("No se pudieron consultar los empleado");
  }
};

export const addNewEmpleado = async (empleado) => {
  try {
    const created_by = getLoggedUserId();
    const newEmpleado = { ...empleado, created_by };
    const { data } = await axios.post(
      import.meta.env.VITE_EMPLEADOS,
      newEmpleado,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    console.log(data);
    return data.data;
  } catch (error) {
    throw new Error("No se pudo crear el empleado");
  }
};

export const updateEmpleado = async (empleado) => {
  try {
    const updated_by = getLoggedUserId();
    const newEmpleado = { ...empleado, updated_by };
    const { data } = await axios.put(
      import.meta.env.VITE_EMPLEADOS + "/" + empleado.id,
      newEmpleado,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw new Error("No se pudo crear el empleado");
  }
};
