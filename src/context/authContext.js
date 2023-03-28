import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [travels, setTravels] = useState([]);

  return (
    <AuthContext.Provider value={{ user, setUser, categories, setCategories, travels, setTravels }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
