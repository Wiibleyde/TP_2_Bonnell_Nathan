import axios from 'axios';
import type { User } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const userService = {
  getAll() {
    return api.get<User[]>('/users');
  },

  getById(id: string) {
    return api.get<User>(`/users/${id}`);
  },

  create(data: User) {
    return api.post<User>('/users', data);
  },

  update(id: string, data: User) {
    return api.put<User>(`/users/${id}`, data);
  },

  remove(id: string) {
    return api.delete(`/users/${id}`);
  },
};
