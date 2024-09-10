import express from "express";
import { PORT, FRONTEND } from "./config/config.js";
import testDbConnection from "./helpers/testDbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import empleadoRoutes from "./routes/empleadoRoutes.js";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/solicitudes", solicitudRoutes);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Ruta no encontrada" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Runing in http://localhost:${PORT}`);

  testDbConnection()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});
