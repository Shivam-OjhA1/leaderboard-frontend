// import React, { useState } from 'react';
// import {
//   Box, TextField, Button, Select, MenuItem, Typography
// } from '@mui/material';
// import { useUserContext } from '../context/UserContext';
// import api from '../api';

// const UserSelector = ({ selectedUser, setSelectedUser, onClaim }) => {
//   const { users, fetchUsers } = useUserContext();
//   const [newUser, setNewUser] = useState('');

//   const handleAddUser = async () => {
//     if (!newUser.trim()) return;
//     try {
//       await api.post('/users', { name: newUser });
//       setNewUser('');
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
//       <Typography variant="h6" gutterBottom>🎯 Claim Points</Typography>
//       <Select
//         value={selectedUser}
//         onChange={(e) => setSelectedUser(e.target.value)}
//         displayEmpty
//         fullWidth
//         sx={{ mb: 2 }}
//       >
//         <MenuItem value="">-- Select a User --</MenuItem>
//         {users.map((user) => (
//           <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
//         ))}
//       </Select>
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         disabled={!selectedUser}
//         onClick={() => onClaim(selectedUser)}
//       >
//         Claim Points
//       </Button>
//       <Box display="flex" gap={1} mt={3}>
//         <TextField
//           label="New User"
//           value={newUser}
//           onChange={(e) => setNewUser(e.target.value)}
//           fullWidth
//         />
//         <Button variant="contained" color="success" onClick={handleAddUser}>
//           Add
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserSelector;


// src/components/UserSelector.js
import React, { useState } from 'react';
import {
  Box, TextField, Button, Select, MenuItem,
  Typography, Paper, Snackbar, Alert
} from '@mui/material';
import { useUserContext } from '../context/UserContext';
import api from '../api';

const UserSelector =  ({ selectedUser, setSelectedUser }) => {
  const { users, fetchUsers,fetchLeaderboard } = useUserContext();
  const [newUser, setNewUser] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      await api.post('/users', { name: newUser });
      setNewUser('');
      fetchUsers();
      showSnackbar('User added successfully!', 'success');
    } catch (err) {
      showSnackbar('Error adding user', 'error');
      console.error(err);
    }
   
  };
  
  

  async function handleClaimPoints() {
    if (!selectedUser) return;
    try {
      const res = await api.post(`/claim/${selectedUser}`);
      showSnackbar(`${res.data.claimedPoints} points claimed!`, 'success');
      fetchUsers(); // update dropdown values
    } catch (err) {
      showSnackbar('Error claiming points', 'error');
      console.error(err);
    }
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom color="secondary">
        🎯 Select a User to Claim Points
      </Typography>

      <Select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">-- Select a User --</MenuItem>
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedUser}
        onClick={handleClaimPoints}
      >
        Claim Points
      </Button>

      <Box display="flex" gap={1} mt={3}>
        <TextField
          label="New User"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          fullWidth
          size="small"
        />
        <Button variant="contained" color="success" onClick={handleAddUser}>
          Add
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserSelector;
