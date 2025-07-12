import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
 const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('/auth/me', {
        headers: {
          Authorization:token,
        },
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ email: res.data.email });
      navigate('/')
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }finally{
      setLoading(false)
    }
  };

  const register = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post('/auth/register', { email, password });
    //   localStorage.setItem('token', res.data.token);
    //   setUser({ email: res.data.email });
      navigate('/login')
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }finally{setLoading(false)}
  };

  const logout = () => {
    setLoading(true)
   try {
     localStorage.removeItem('token');
     setUser(null);
     navigate('/')
   } catch (error) {
    console.log(error)
   }finally{
    setLoading(false)
   }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
