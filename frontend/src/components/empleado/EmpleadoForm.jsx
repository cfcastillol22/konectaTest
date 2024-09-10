import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useEmpleadoForm } from "../../hooks/useEmpleadoForm";
import EmpleadoFields from "./EmpleadoFields";

const EmpleadoForm = () => {
  const { empleadoSeleccionado } = useSelector((state) => state.empleados);
  const { validationSchema, onSubmit } = useEmpleadoForm();

  const initialValues = {
    nombre: empleadoSeleccionado?.nombre || "",
    salario: empleadoSeleccionado?.salario || "",
    fecha_ingreso: empleadoSeleccionado?.fecha_ingreso || "",
  };

  return (
    <div className='max-w-12xl mx-auto p-8'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, empleadoSeleccionado)
        }
        enableReinitialize={true}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className='flex flex-wrap space-x-4'>
            <EmpleadoFields />
            <div className='w-full mt-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md'
              >
                {empleadoSeleccionado
                  ? "Actualizar Empleado"
                  : "Agregar Empleado"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EmpleadoForm;
