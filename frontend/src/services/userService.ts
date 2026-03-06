import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const userService = {
  getAll() {
    return api.get('/users');
  },

  getById(id: string) {
    return api.get(`/users/${id}`);
  },

  create(data: unknown) {
    return api.post('/users', data);
  },

  update(id: string, data: unknown) {
    return api.put(`/users/${id}`, data);
  },

  remove(id: string) {
    return api.delete(`/users/${id}`);
  },
};
