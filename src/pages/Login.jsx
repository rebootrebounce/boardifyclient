import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      }, {
        withCredentials: true, // This ensures that cookies (like the token) are sent with the request
      });

      if (response.status === 200) {
        console.log('Login successful', response);

        // Backend already set the token in cookies (httpOnly), so just update user context
        loginUser(response.data.user);

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;