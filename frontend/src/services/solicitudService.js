import axios from "axios";
import { getToken as token, getLoggedUserId } from "./authService";

export const getSolicitudes = async () => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_SOLICITUDES, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error("No se pudieron consultar las solicitudes");
  }
};

export const addNewSolicitud = async (solicitud) => {
  try {
    const created_by = getLoggedUserId();
    const newSolicitud = { ...solicitud, created_by };
    const { data } = await axios.post(
      import.meta.env.VITE_SOLICITUDES,
      newSolicitud,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw new Error("No se pudo crear la Solicitud");
  }
};

export const updateSolicitud = async (solicitud) => {
  try {
    const updated_by = getLoggedUserId();
    const newEmpleado = { ...solicitud, updated_by };
    const { data } = await axios.put(
      import.meta.env.VITE_SOLICITUDES + "/" + solicitud.id,
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

export const deleteSolicitud = async (id) => {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_SOLICITUDES + "/" + id,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("No se pudo eliminar la solicitud");
  }
};
