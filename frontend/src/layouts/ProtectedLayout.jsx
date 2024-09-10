import { Outlet, useNavigate } from "react-router-dom";
import useAuthValidation from "../hooks/useAuthValidation";
import { useGlobalState } from "../hooks/useGlobalState";

const ProtectedLayout = () => {
  useAuthValidation();
  const { user, logout } = useGlobalState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={"bg-white text-black min-h-screen"}>
      <header className='bg-blue-500 text-white p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-xl font-bold'>KonectaTest App</h1>

          {user ? (
            <div className='flex space-x-2'>
              <p>
                Bienvenido, <strong>{user.name}</strong>
              </p>
              <p>Correo: {user.email}</p>
              <p>Rol: {user.rol}</p>
            </div>
          ) : (
            <p>No se ha iniciado sesión.</p>
          )}

          <div className='flex space-x-2'>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded'
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className='container mx-auto p-8'>
        <Outlet />
      </main>

      <footer className='bg-blue-500 text-white text-center p-4'>
        <p>{new Date().getFullYear()} &copy; KonectaTest</p>
      </footer>
    </div>
  );
};

export default ProtectedLayout;
