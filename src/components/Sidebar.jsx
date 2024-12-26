import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const Sidebar = ({ userdata }) => {
  const { logoutUser, user } = useUser();
  const [toggleProfile, setToggleProfile] = useState(false);
  const navigate = useNavigate();
  return (
    <aside className="w-56 bg-indigo-900 text-white h-lvh p-4 relative">
      <ul>
        <li className="mb-10">
          <h1 className="text-yellow-500 text-4xl font-bold">Boardify</h1>
        </li>
        <li className="mb-6">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/projects" className="hover:text-gray-300">
            Projects
          </Link>
        </li>
        <li className="mb-6">
          <Link to="/tasks" className="hover:text-gray-300">
            Workspaces
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/tasks" className="hover:text-gray-300">
            Members
          </Link>
        </li>
        <hr className="bg-yellow-500 h-1 border-0"/>
        <li className="mt-4">
          <Link to="/settings" className="hover:text-gray-300">
            Settings
          </Link>
        </li>
        <div
          className="w-full text-4xl py-2 rounded absolute bottom-4 left-0 cursor-pointer"
          onClick={() => setToggleProfile((prev) => !prev)}
        >
          <div className="relative p-4 flex justify-start items-center">
            <CgProfile /> <p className="text-lg ml-2">{user.username}</p>
            {toggleProfile ? (
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
                className="ml-4 text-lg p-4 bg-slate-500 rounded absolute bottom-14 left-10 hover:bg-red-500 text-center"
                style={{"clipPath": "polygon(0% 0%, 100% 0%, 100% 90%, 76% 90%, 42% 90%, 12% 90%, 0 100%)"}}
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
