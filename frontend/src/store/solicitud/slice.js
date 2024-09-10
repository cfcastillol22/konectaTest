import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewSolicitud,
  getSolicitudes,
  updateSolicitud,
  deleteSolicitud,
} from "../../services/solicitudService";

export const fetchSolicitudes = createAsyncThunk(
  "solicitud/fetchSolicitudes",
  async (_, { rejectWithValue }) => {
    try {
      return await getSolicitudes();
    } catch (error) {
      return rejectWithValue("Error al consultar las solicitudes");
    }
  }
);

export const addSolicitud = createAsyncThunk(
  "solicitud/addSolicitud",
  async (solicitud, { rejectWithValue }) => {
    try {
      return await addNewSolicitud(solicitud);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSolicitudes = createAsyncThunk(
  "solicitud/updateSolicitudes",
  async (solicitud, { rejectWithValue }) => {
    try {
      return await updateSolicitud(solicitud);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSolicitudes = createAsyncThunk(
  "solicitudes/deleteSolicitud",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSolicitud(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice de solicitudes
const solicitudSlice = createSlice({
  name: "solicitudes",
  initialState: {
    solicitudes: [],
    solicitudSeleccionada: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSolicitudSeleccionada: (state, action) => {
      state.solicitudSeleccionada = action.payload;
    },
    clearSolicitudSeleccionada: (state) => {
      state.solicitudSeleccionada = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolicitudes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSolicitudes.fulfilled, (state, action) => {
        state.solicitudes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSolicitudes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSolicitud.fulfilled, (state, action) => {
        state.solicitudes.push(action.payload);
      })
      .addCase(updateSolicitudes.fulfilled, (state, action) => {
        const index = state.solicitudes.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.solicitudes[index] = action.payload;
        }
      })
      .addCase(addSolicitud.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteSolicitudes.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSolicitudes.fulfilled, (state, action) => {
        state.solicitudes = state.solicitudes.filter(
          (solicitud) => solicitud.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteSolicitudes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSolicitudSeleccionada, clearSolicitudSeleccionada } =
  solicitudSlice.actions;

export default solicitudSlice.reducer;
