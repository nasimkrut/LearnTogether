import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const registerUser = async (data) => {
  try {
    const response = await api.post('/api/user/register', data)
    return response.data
  } catch (e) {
    console.error('Ошибка регистрации:', e.response?.data || e.message)
    throw e;
  }
}

export const getUsers = async (filters) => {
  try {
    const response = await api.get(`/main}`, filters);
    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
}


export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    throw error;
  }
}

export const updateUserProfile = async (userId, data) => {
  try {
    const response = await api.put(`/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    throw error;
  }
}

export const uploadProfileImage = async (userId, formData) => {
  try {
    const response = await api.put(`/profile/${userId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    throw error;
  }
}

export default api;