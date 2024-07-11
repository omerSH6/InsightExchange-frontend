import React, { createContext, useState, useContext, useEffect } from 'react';
import { backendUrl } from '../config';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loadingAuthContext, setLoadingAuthContext] = useState(true);


  useEffect(() => {
    const loadContext = async () => {
      let tokenFromStorage = localStorage.getItem('token');
      let useNameFromStorage = localStorage.getItem('userName');
      let userIdFromStorage = localStorage.getItem('userId');
       if(tokenFromStorage != null){
          setToken(tokenFromStorage);
          setIsLoggedIn(true);
          setUserName(useNameFromStorage);
          setUserId(userIdFromStorage);
       }

    };

    loadContext();
    setLoadingAuthContext(false);
  }, []);


  const login = async (userName, email, password) => {
    try {
      const requestBody = {
        userName: userName,
        email: email,
        password: password
      };
      const response = await fetch(`${backendUrl}/api/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.loginToken);
      localStorage.setItem('userName', data.userName); 
      localStorage.setItem('userId', data.userId);  
      setToken(data.loginToken);
      setUserName(data.userName);
      setUserId(data.userId);
      setIsLoggedIn(true);

    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userId'); 
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userName, userId, loadingAuthContext, login, logout }}>
      {!loadingAuthContext && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);