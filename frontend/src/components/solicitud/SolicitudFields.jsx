import { Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

const SolicitudFields = () => {
  const { empleados } = useSelector((state) => state.empleados); // Obtener la lista de empleados desde el store

  return (
    <>
      <div className='flex-1 min-w-[200px]'>
        <label
          htmlFor='codigo'
          className='block text-sm font-medium text-gray-700'
        >
          Código
        </label>
        <Field
          name='codigo'
          type='text'
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
        />
        <ErrorMessage
          name='codigo'
          component='div'
          className='text-red-500 text-sm mt-1'
        />
      </div>

      <div className='flex-1 min-w-[200px]'>
        <label
          htmlFor='descripcion'
          className='block text-sm font-medium text-gray-700'
        >
          Descripción
        </label>
        <Field
          name='descripcion'
          type='text'
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
        />
        <ErrorMessage
          name='descripcion'
          component='div'
          className='text-red-500 text-sm mt-1'
        />
      </div>

      <div className='flex-1 min-w-[200px]'>
        <label
          htmlFor='resumen'
          className='block text-sm font-medium text-gray-700'
        >
          Resumen
        </label>
        <Field
          name='resumen'
          type='text'
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
        />
        <ErrorMessage
          name='resumen'
          component='div'
          className='text-red-500 text-sm mt-1'
        />
      </div>

      <div className='flex-1 min-w-[200px]'>
        <label
          htmlFor='empleado_id'
          className='block text-sm font-medium text-gray-700'
        >
          Empleado
        </label>
        <Field
          as='select'
          name='empleado_id'
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
        >
          <option value=''>Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.id} - {empleado.nombre}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name='empleado_id'
          component='div'
          className='text-red-500 text-sm mt-1'
        />
      </div>
    </>
  );
};

export default SolicitudFields;
