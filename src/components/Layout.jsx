// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <div className="h-screen flex flex-row">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useUser } from "../context/UserContext";

export const Layout = () => {
  const { user } = useUser();

  return (
    <div className="flex">
      {user && <Sidebar />} {/* Show Sidebar only if user is logged in */}
      <div className="flex-1">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};