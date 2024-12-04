import api from './api';

export const getUsersByFilters = async (filters) => {
  try {
    const response = await api.post('/api/users', {params: filters});
    return response.data;
  } catch (e) {
    console.error('Ошибка получения списка пользователей:', e);
    throw e;
  }
}
