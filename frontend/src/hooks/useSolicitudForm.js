import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  addSolicitud,
  updateSolicitudes,
  clearSolicitudSeleccionada,
  fetchSolicitudes,
} from "../store/solicitud/slice";

export const useSolicitudForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    codigo: Yup.string().required("El código es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    resumen: Yup.string().required("El resumen es obligatorio"),
    empleado_id: Yup.number()
      .required("El Empleado es obligatorio")
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero"),
  });

  const onSubmit = async (
    values,
    { setSubmitting, resetForm },
    solicitudSeleccionada
  ) => {
    try {
      if (solicitudSeleccionada) {
        await dispatch(
          updateSolicitudes({ ...values, id: solicitudSeleccionada.id })
        ).unwrap();
        toast.success("Solicitud actualizada con éxito");
        dispatch(clearSolicitudSeleccionada());
      } else {
        await dispatch(addSolicitud(values)).unwrap();
        toast.success("Solicitud agregada con éxito");
      }
      resetForm();
      dispatch(fetchSolicitudes());
    } catch (error) {
      toast.error("Error al procesar la operación");
    } finally {
      setSubmitting(false);
    }
  };

  return { validationSchema, onSubmit };
};
