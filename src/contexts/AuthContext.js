import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // persisted users (simple localStorage-backed store for demo)
  const [users, setUsers] = useState(() => {
    const s = localStorage.getItem('akruti_users');
    if (s) return JSON.parse(s);
    // seed with a safe default admin and one doctor/staff
    return [
      { id: 1, name: 'Administrator', email: 'admin@akruti.com', password: 'Admin@123', role: 'admin', permissions: ['all'] },
      { id: 2, name: 'Dr. Emily Chen', email: 'emily.chen@akruti.com', password: 'Doctor@123', role: 'doctor', permissions: ['patients', 'appointments', 'schedule'] },
      { id: 3, name: 'Staff User', email: 'staff@akruti.com', password: 'Staff@123', role: 'staff', permissions: ['patients', 'appointments', 'billing'] }
    ];
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('akruti_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const saveUsers = (next) => {
    setUsers(next);
    localStorage.setItem('akruti_users', JSON.stringify(next));
  };

  // login by email+password against stored users
  const login = async ({ email, password }) => {
    const found = users.find(u => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    setUser(found);
    localStorage.setItem('akruti_user', JSON.stringify(found));
    return found;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('akruti_user');
  };

  const register = (userData) => {
    const newUser = { id: Date.now(), ...userData };
    const next = [...users, newUser];
    saveUsers(next);
    setUser(newUser);
    localStorage.setItem('akruti_user', JSON.stringify(newUser));
    return newUser;
  };

  // admin-only creation for users (admin can create any role)
  const createUser = (creator, userData) => {
    if (!creator || creator.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    const newUser = {
      id: Date.now(),
      ...userData
    };
    const next = [...users, newUser];
    saveUsers(next);
    return newUser;
  };

  // admin-only deletion of a user
  const deleteUser = (creator, id) => {
    if (!creator || creator.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    const next = users.filter(u => u.id !== id);
    saveUsers(next);
    // if deleting currently logged-in user, log them out
    if (user && user.id === id) {
      logout();
    }
    return true;
  };

  const value = {
    user,
    users,
    deleteUser,
    login,
    logout,
    register,
    createUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
