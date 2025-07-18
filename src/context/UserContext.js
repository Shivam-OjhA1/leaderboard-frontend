import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/leaderboard');
      setLeaderboard(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  return (
    <UserContext.Provider value={{
      users, setUsers, fetchUsers,
      leaderboard, fetchLeaderboard
    }}>
      {children}
    </UserContext.Provider>
  );
};
