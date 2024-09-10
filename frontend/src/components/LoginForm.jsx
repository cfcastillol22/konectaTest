import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@nextui-org/react";

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-4'>
      <h3 className='text-2xl font-bold text-center text-gray-800'>
        Iniciar sesión
      </h3>

      <div>
        <Input
          clearable
          bordered
          fullWidth
          label='Email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.errors.email ? formik.errors.email : ""}
          status={formik.errors.email ? "error" : "default"}
          className='mt-1'
        />
        {formik.errors.email && (
          <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
        )}
      </div>

      <div>
        <Input
          clearable
          bordered
          fullWidth
          label='Contraseña'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik.errors.password ? formik.errors.password : ""}
          status={formik.errors.password ? "error" : "default"}
          className='mt-1'
        />
        {formik.errors.password && (
          <p className='text-red-500 text-xs mt-1'>{formik.errors.password}</p>
        )}
      </div>

      <Button type='submit' shadow color='primary' fullWidth className='py-2'>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
