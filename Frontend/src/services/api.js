import axios from "axios";
import Cookies from "js-cookie";
import log from "eslint-plugin-react/lib/util/log.js";

const api = axios.create({
  baseURL: "http://84.201.167.107/",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const createPost = async (data) => {
  try {
    console.log(data.userId);
    const response = await api.post('api/post/AddPost', {
      userId: data.userId,
      requiredSubject: data.requiredSubject, // число
      helpSubjects: data.helpSubjects, // масив чисел
      description: data.description, // строка
      tags: data.tags || [] // масив строк 
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Ошибка при создании поста:', error.response?.data || error.message);
    throw error;
  }
};

export const getStoredUserName = () => {
  const name = sessionStorage.getItem('userName');
  console.log(name);
  return name;
};

export const getUserId = async (userName) => {
  try {
    const response = await api.get('api/user/getUserId', {params: {userName}});
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении id:', error.response?.data || error.message);
    throw error;
  }
}

export const registerUser = async (data) => {
  try {
    console.log('Отправляемые данные:', data);
    console.log('Data login3:', data.UserName)
    const response = await api.post('api/user/register', {
      UserName: data.UserName,
      FullName: data.FullName,
      PasswordHash: data.PasswordHash,
      Rating: data.Rating,
    });
    console.log('Data login4:', data.UserName)
    console.log(response)
    localStorage.setItem('userName', data.UserName);
    console.log('Data login5:', data.UserName)
    return response.data;
  } catch (e) {
    console.error('Ошибка регистрации:', e.response?.data || e.message);
    throw e;
  }
};

export const loginUser = async (data) => {
  try {
    //const response = await api.post('/user/login', data)
    console.log(data.password, data.password.toString(), data.password.type)
    console.log('Data login1:', data.login)
    const response = await api.post('api/user/login', {
      UserName: data.login,
      Password: data.password.toString()
    });
    localStorage.setItem('userName', data.login);
    console.log('Data login2:', data.login)
    return response.data
  } catch (e) {
    console.error('Ошибка авторизации:', e.response?.data || e.message)
    throw e;
  }
}

export const getPosts = async (filters) => {
  try {
    const response = await api.get('/filtered', {params: filters});
    return response.data;
  } catch (error) {
    console.error("Ошибка получения постов:", error.response?.data || error.message);
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