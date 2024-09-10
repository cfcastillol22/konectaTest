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
  deleteSolicitudes,
  fetchSolicitudes,
  setSolicitudSeleccionada,
} from "../../store/solicitud/slice";
import { fetchEmpleados } from "../../store/empleado/slice";
import { toast } from "react-toastify";
import SolicitudForm from "./SolicitudForm.jsx";
import { useGlobalState } from "../../hooks/useGlobalState.js";

export default function Solicitud() {
  const { user } = useGlobalState();
  const dispatch = useDispatch();
  const { solicitudes, loading, error } = useSelector(
    (state) => state.solicitudes
  );
  const { empleados } = useSelector((state) => state.empleados);

  useEffect(() => {
    if (empleados.length === 0) {
      dispatch(fetchEmpleados());
    }

    dispatch(fetchSolicitudes());
  }, [dispatch, empleados.length]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) {
    return <p>Cargando Solicitudes...</p>;
  }

  const handleEdit = (solicitud) => {
    dispatch(setSolicitudSeleccionada(solicitud));
  };

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta solicitud?")
    ) {
      dispatch(deleteSolicitudes(id))
        .then(() => {
          toast.success("Solicitud eliminada con éxito");
        })
        .catch(() => {
          toast.error("Error al eliminar la solicitud");
        });
    }
  };

  return (
    <>
      {user?.rol === "ADMINISTRADOR" && <SolicitudForm />}
      <div className='max-w-12xl mx-auto p-8'>
        <Table aria-label='Lista de Solicitudes'>
          <TableHeader>
            <TableColumn>id</TableColumn>
            <TableColumn>Código</TableColumn>
            <TableColumn>Descripción</TableColumn>
            <TableColumn>Resumen</TableColumn>
            <TableColumn>Código Empleado</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell>{solicitud.id}</TableCell>
                <TableCell>{solicitud.codigo}</TableCell>
                <TableCell>{solicitud.descripcion}</TableCell>
                <TableCell>{solicitud.resumen}</TableCell>
                <TableCell>
                  {solicitud.empleado ? solicitud.empleado.id : ""}
                </TableCell>
                <TableCell>
                  {user?.rol === "ADMINISTRADOR" && (
                    <>
                      <button
                        onClick={() => handleEdit(solicitud)}
                        className='bg-yellow-500 text-white px-4 py-2 rounded'
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(solicitud.id)}
                        className='bg-red-500 text-white px-4 py-2 ml-2 rounded'
                      >
                        Eliminar
                      </button>
                    </>
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
