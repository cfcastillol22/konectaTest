import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_LOGIN_URL,
      credentials
    );
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("No se recibieron datos válidos de la API");
    }
  } catch (error) {
    toast.error("Error al iniciar sesión " + error.response.data.error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getLoggedUserId = () => {
  const token = getToken();
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.id;
};
