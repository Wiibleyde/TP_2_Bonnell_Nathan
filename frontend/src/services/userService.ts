import axios from 'axios';
import type { User } from '../types';

const api = axios.create({
  baseURL: '/api',
});

interface PaginatedUsersResult {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: User[];
}

export const userService = {
  getAll() {
    return api.get<PaginatedUsersResult>('/users');
  },

  getById(id: string) {
    return api.get<User>(`/users/${id}`);
  },

  create(data: User) {
    return api.post<{ success: boolean; data: User; message?: string }>('/users', data);
  },

  update(id: string, data: User) {
    return api.put<User>(`/users/${id}`, data);
  },

  remove(id: string) {
    return api.delete(`/users/${id}`);
  },
};
