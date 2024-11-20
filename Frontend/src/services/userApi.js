import api from './api';

export const getUsers = async (filters) => {
  const {rating, subjects} = filters;
  const response = await api.get('/users', {params: {rating, subjects}});
  return response.data;
}

export default {getUsers}