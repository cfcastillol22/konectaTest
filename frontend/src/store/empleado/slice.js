import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewEmpleado,
  getEmpleado,
  updateEmpleado,
} from "../../services/empleadoService";

export const fetchEmpleados = createAsyncThunk(
  "empleado/fetchEmpleado",
  async (_, { rejectWithValue }) => {
    try {
      return await getEmpleado();
    } catch (error) {
      return rejectWithValue("Error al consultar los empleados");
    }
  }
);

export const addEmpleado = createAsyncThunk(
  "empleado/addEmpleado",
  async (empleado, { rejectWithValue }) => {
    try {
      return await addNewEmpleado(empleado);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmpleados = createAsyncThunk(
  "empleado/updateEmpleado",
  async (empleado, { rejectWithValue }) => {
    try {
      return await updateEmpleado(empleado);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const empleadoSlice = createSlice({
  name: "empleados",
  initialState: {
    empleados: [],
    empleadoSeleccionado: null,
    loading: false,
    error: null,
  },
  reducers: {
    setEmpleadoSeleccionado: (state, action) => {
      state.empleadoSeleccionado = action.payload;
    },
    clearEmpleadoSeleccionado: (state) => {
      state.empleadoSeleccionado = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpleados.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmpleados.fulfilled, (state, action) => {
        state.empleados = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmpleados.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEmpleado.fulfilled, (state, action) => {
        state.empleados.push(action.payload);
      })
      .addCase(updateEmpleados.fulfilled, (state, action) => {
        const index = state.empleados.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.empleados = [
            ...state.empleados.slice(0, index),
            action.payload,
            ...state.empleados.slice(index + 1),
          ];
        }
      })
      .addCase(addEmpleado.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setEmpleadoSeleccionado, clearEmpleadoSeleccionado } =
  empleadoSlice.actions;

export default empleadoSlice.reducer;
