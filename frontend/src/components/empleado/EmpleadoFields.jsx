import { Field, ErrorMessage } from "formik";

const EmpleadoFields = () => (
  <>
    <div className='flex-1 min-w-[200px]'>
      <label
        htmlFor='nombre'
        className='block text-sm font-medium text-gray-700'
      >
        Nombre
      </label>
      <Field
        name='nombre'
        type='text'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
      />
      <ErrorMessage
        name='nombre'
        component='div'
        className='text-red-500 text-sm mt-1'
      />
    </div>

    <div className='flex-1 min-w-[200px]'>
      <label
        htmlFor='salario'
        className='block text-sm font-medium text-gray-700'
      >
        Salario
      </label>
      <Field
        name='salario'
        type='number'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
      />
      <ErrorMessage
        name='salario'
        component='div'
        className='text-red-500 text-sm mt-1'
      />
    </div>

    <div className='flex-1 min-w-[200px]'>
      <label
        htmlFor='fecha_ingreso'
        className='block text-sm font-medium text-gray-700'
      >
        Fecha de Ingreso
      </label>
      <Field
        name='fecha_ingreso'
        type='date'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
      />
      <ErrorMessage
        name='fecha_ingreso'
        component='div'
        className='text-red-500 text-sm mt-1'
      />
    </div>
  </>
);

export default EmpleadoFields;
