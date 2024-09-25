import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-700 text-white h-full p-4">
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/tasks" className="hover:text-gray-300">Tasks</Link>
        </li>
        <li>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;