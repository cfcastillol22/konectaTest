import { configureStore } from "@reduxjs/toolkit";
import solicitudReducer from "./solicitud/slice.js";
import empleadoReducer from "./empleado/slice.js";

export const store = configureStore({
  reducer: {
    solicitudes: solicitudReducer,
    empleados: empleadoReducer,
  },
});
