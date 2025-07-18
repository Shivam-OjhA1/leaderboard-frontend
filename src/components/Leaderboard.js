import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserContext } from '../context/UserContext';
import api from '../api';
import { yellow } from '@mui/material/colors';

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard, fetchUsers } = useUserContext();

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await api.delete(`/users/${id}`);
    fetchLeaderboard();
    fetchUsers();
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography  variant="h6" align="center" sx={{ mt: 2 }}>
        🏆 Leaderboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>User</TableCell>
            <TableCell align="center">Points</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell align="center">{user.totalPoints}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleDeleteUser(user._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
