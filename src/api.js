import axios from 'axios';

const api = axios.create({
  baseURL:'https://leaderboard-ws9i.onrender.com/api',
});

export default api;
