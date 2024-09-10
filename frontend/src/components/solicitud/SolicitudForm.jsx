import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useSolicitudForm } from "../../hooks/useSolicitudForm";
import SolicitudFields from "./SolicitudFields";

const SolicitudForm = () => {
  const { solicitudSeleccionada } = useSelector((state) => state.solicitudes);
  const { validationSchema, onSubmit } = useSolicitudForm();

  const initialValues = {
    codigo: solicitudSeleccionada?.codigo || "",
    descripcion: solicitudSeleccionada?.descripcion || "",
    resumen: solicitudSeleccionada?.resumen || "",
    empleado_id: solicitudSeleccionada?.empleado_id || "",
  };

  return (
    <div className='max-w-12xl mx-auto p-8'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, solicitudSeleccionada)
        }
        enableReinitialize={true}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className='flex flex-wrap space-x-4'>
            <SolicitudFields />
            <div className='w-full mt-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md'
              >
                {solicitudSeleccionada
                  ? "Actualizar Solicitud"
                  : "Agregar Solicitud"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SolicitudForm;
