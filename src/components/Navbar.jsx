import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">Boardify Kanban</h1>
      <div className="text-white">
        {user && (
          <>
            <span>{user.name}</span>
            <button onClick={logout} className="ml-4 bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;