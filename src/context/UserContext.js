import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../api/axiosInstance';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('tokens');
    if (token) {
      axiosInstance.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        setUser(response.data.user);
      }).catch((error) => {
        Cookies.remove("tokens")
        Cookies.remove("user")
        setUser(null)
      }).finally(() => {
        setLoading(false); // Loading is complete
      });
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = (token) => {
    Cookies.set('tokens', `${token.token}`, { expires: 7 });
    Cookies.set('user', token.user)
    setUser(token.user);
  };

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('tokens');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);