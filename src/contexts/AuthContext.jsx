import React, { createContext, useState, useContext } from 'react';
import { backendUrl } from '../config';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

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
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);