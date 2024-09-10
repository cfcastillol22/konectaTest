import { Router } from "express";
import {
  getAllSolicitudes,
  createSolicitud,
  deleteSolicitud,
  updateSolicitud,
} from "../controllers/solicitudController.js";

import validateSolicitud from "../middlewares/solicitudValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["EMPLEADO", "ADMINISTRADOR"]),
  getAllSolicitudes
);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMINISTRADOR"]),
  validateSolicitud,
  createSolicitud
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMINISTRADOR"]),
  validateSolicitud,
  updateSolicitud
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMINISTRADOR"]),
  deleteSolicitud
);

export default router;
