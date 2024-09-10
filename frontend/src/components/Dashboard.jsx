import { useState } from "react";
import Solicitud from "./solicitud/Solicitud";
import Empleado from "./empleado/Empleado";

const Dashboard = () => {
  const [showSolicitudes, setShowSolicitudes] = useState(false);
  const [showEmpleados, setShowEmpleados] = useState(false);

  const handleShowSolicitudes = () => {
    setShowSolicitudes(true);
    setShowEmpleados(false);
  };

  const handleShowEmpleados = () => {
    setShowEmpleados(true);
    setShowSolicitudes(false);
  };

  return (
    <div
      className={`dashboard min-h-screen ${
        showSolicitudes || showEmpleados ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className='container mx-auto p-8'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
          Panel de Control
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <button
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded transition duration-300'
            onClick={handleShowSolicitudes}
          >
            Gestionar Solicitudes
          </button>

          <button
            className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded transition duration-300'
            onClick={handleShowEmpleados}
          >
            Gestionar Empleados
          </button>
        </div>

        <div className='mt-8'>
          {showSolicitudes && (
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-bold mb-4'>Solicitudes</h2>
              <Solicitud />
            </div>
          )}

          {showEmpleados && (
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-bold mb-4'>Empleados</h2>
              <Empleado />
            </div>
          )}

          {!showSolicitudes && !showEmpleados && (
            <div className='text-center text-gray-500'>
              <p>Seleccione una opción para ver más información.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
