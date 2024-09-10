import { Card } from "@nextui-org/react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalState } from "../hooks/useGlobalState";

const LoginPage = () => {
  const { login } = useGlobalState();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const success = await login(credentials);
      if (success) {
        navigate("/dashboard");
        toast.success("Sesión iniciada correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='p-8 shadow-lg' css={{ maxWidth: "400px" }}>
        <LoginForm onSubmit={handleLogin} />
      </Card>
    </div>
  );
};

export default LoginPage;
