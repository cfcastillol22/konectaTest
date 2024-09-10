import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  fetchEmpleados,
  setEmpleadoSeleccionado,
} from "../../store/empleado/slice";
import { toast } from "react-toastify";
import EmpleadoForm from "./EmpleadoForm.jsx";
import { useGlobalState } from "../../hooks/useGlobalState";

export default function Empleado() {
  const { user } = useGlobalState();
  const dispatch = useDispatch();
  const { empleados, loading, error } = useSelector((state) => state.empleados);

  useEffect(() => {
    dispatch(fetchEmpleados());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) {
    return <p>Cargando Empleados...</p>;
  }

  const handleEdit = (empleado) => {
    dispatch(setEmpleadoSeleccionado(empleado));
  };

  return (
    <>
      {user?.rol === "ADMINISTRADOR" && <EmpleadoForm />}
      <div className='max-w-12xl mx-auto p-8'>
        <Table aria-label='Lista de Solicitudes'>
          <TableHeader>
            <TableColumn>id</TableColumn>
            <TableColumn>Fecha Ingreso</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Salario</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.id}</TableCell>
                <TableCell>{empleado.fecha_ingreso}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.salario}</TableCell>
                <TableCell>
                  {user?.rol === "ADMINISTRADOR" && (
                    <button
                      onClick={() => handleEdit(empleado)}
                      className='bg-yellow-500 text-white px-4 py-2 rounded'
                    >
                      Editar
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
