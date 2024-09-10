import { Router } from "express";
import {
  getAllEmpleados,
  createEmpleado,
  updateEmpleado,
} from "../controllers/empleadoController.js";
import validateEmpleado from "../middlewares/empleadoValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["EMPLEADO", "ADMINISTRADOR"]),
  getAllEmpleados
);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMINISTRADOR"]),
  validateEmpleado,
  createEmpleado
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMINISTRADOR"]),
  validateEmpleado,
  updateEmpleado
);

export default router;
