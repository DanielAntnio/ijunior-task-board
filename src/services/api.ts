import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer 1d1f9eb5-bd2f-4e53-8716-1b88e3181852',
    'Content-Type': 'application/json',
  },
});