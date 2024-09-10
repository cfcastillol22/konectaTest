import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ProtectedLayout = lazy(() => import("../layouts/ProtectedLayout.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const DashboardPage = lazy(() => import("../pages/DashboadPage.jsx"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
