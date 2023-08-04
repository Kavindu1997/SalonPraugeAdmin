import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout";
import Dashboard from "./pages/Dashboard/dashboard";
import Client from "./pages/Client/client";
import Admin from "./pages/Admin/admin";
import Reservation from "./pages/Reservation/reservation";
import CalenderScheduler from "./pages/Calender/calenderScheduler";
import RegisterForm from "./pages/Registration/registerForm";
import Loginform from "./pages/Login/loginform";
import AdminForm from "./pages/Admin/adminForm";
import ClientForm from "./pages/Client/clientForm";
import ReservationForm from "./pages/Reservation/reservationForm";
import Logout from "./pages/logout";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "antd/dist/antd.min.css";
import { theme } from "./styles/main-theme";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <ToastContainer theme="dark" /> */}
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Loginform />} />
      </Routes>
      {user && (
        <Layout user={user}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/client/:id" element={<ClientForm />} />
              <Route path="/client" element={<Client />} />
              <Route path="/admin/:id" element={<AdminForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/reservation/:id" element={<ReservationForm />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/calender" element={<CalenderScheduler />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* <Route path="/*" element={<Navigate to="/not-found" />} /> */}
            </Route>
          </Routes>
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
