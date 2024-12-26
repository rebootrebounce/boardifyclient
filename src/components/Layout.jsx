import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import PrivateRoute from "./PrivateRoute";
// import Navbar from "./Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useUser } from "../context/UserContext";
import Registration from "../pages/Registration";
import Projects from "../pages/project";
import { ToastContainer } from 'react-toastify';
import Board from "./board";

export const Layout = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {user && <Sidebar userdata={user} />}
      <div className="flex-1">
        {/* <Navbar /> */}
        <Routes>
          {!user && <Route path="/login" element={<Login />} />}
          <Route path="/registration" element={<Registration/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/board/:projectId" element={<Board/>}/>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};