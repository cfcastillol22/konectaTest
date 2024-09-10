import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  addEmpleado,
  updateEmpleados,
  clearEmpleadoSeleccionado,
} from "../store/empleado/slice";

export const useEmpleadoForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    salario: Yup.number()
      .required("El salario es obligatorio")
      .min(1, "El salario debe ser mayor a 0"),
    fecha_ingreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  });

  const onSubmit = async (
    values,
    { setSubmitting, resetForm },
    empleadoSeleccionado
  ) => {
    try {
      if (empleadoSeleccionado) {
        await dispatch(
          updateEmpleados({ ...values, id: empleadoSeleccionado.id })
        ).unwrap();
        toast.success("Empleado actualizado con éxito");
        dispatch(clearEmpleadoSeleccionado());
      } else {
        await dispatch(addEmpleado(values)).unwrap();
        toast.success("Empleado agregado con éxito");
      }
      resetForm();
    } catch (error) {
      toast.error("Error al procesar la operación");
    } finally {
      setSubmitting(false);
    }
  };

  return { validationSchema, onSubmit };
};
