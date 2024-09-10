import { useEffect } from "react";
import { useGlobalState } from "./useGlobalState";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuthValidation = () => {
  const { user, logout } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!savedUser || !accessToken) {
      logout();
      toast.error("Debe Iniciar Sesión");
      navigate("/login");
    }
  }, [user, logout, navigate]);
};

export default useAuthValidation;
