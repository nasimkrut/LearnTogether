import axios from "axios";
import Cookies from "js-cookie";
import qs from 'qs';

const api = axios.create({
  baseURL: "http://84.201.167.107/",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const createPost = async (data) => {
  try {
    const response = await api.post("api/post/AddPost", {
      UserId: data.userId,
      RequiredSubject: data.requiredSubject, // число
      HelpSubjects: data.helpSubjects, // масив чисел
      Description: data.description, // строка
      Tags: data.tags || [] // масив строк
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании поста:', error.response?.data || error.message);
    throw error;
  }
};

export const getStoredUserName = () => {
  const name = sessionStorage.getItem('userName');
  if (name !== undefined)
    return name;
  throw new Error(`User undefined. No such key 'userName' in sessionStorage.`)
};

export const getUserId = async (userName) => {
  try {
    const response = await api.get(`api/user/getUserId?userName=${userName.toString()}`);
    return response.data.toString();
  } catch (error) {
    console.error('Ошибка при получении id:', error.response?.data || error.message);
    throw error;
  }
}

export const getUserByUserName = async (userName) => {
  try {
    const response = await api.get(`api/user/getUserByUserName?userName=${userName.toString()}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении user с @${userName}:`, error.response?.data || error.message);
    throw error;
  }
}

export const getUserByUserId = async (id) => {
  try {
    const response = await api.get(`api/user/getUserByUserId?userId=${id.toString()}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении user с id=${id}:`, error.response?.data || error.message);
    throw error;
  }
}

export const registerUser = async (data) => {
  try {
    const response = await api.post('api/user/register', {
      UserName: data.UserName,
      FullName: data.FullName,
      PasswordHash: data.PasswordHash,
      Rating: data.Rating,
      Description: data.Description,
    });
    const userId = await getUserId(data.UserName);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userName', data.UserName);
    return response.data;
  } catch (e) {
    console.error('Ошибка регистрации:', e.response?.data || e.message);
    throw e;
  }
};

export const loginUser = async (data) => {
  try {
    Cookies.set('userName', data.UserName, {expires: 7});
    const response = await api.post('api/user/login', {
      UserName: data.login,
      Password: data.password.toString()
    });
    sessionStorage.setItem('userName', data.login);
    return response.data
  } catch (e) {
    console.error('Ошибка авторизации:', e.response?.data || e.message)
    throw e;
  }
}

export const getPosts = async (filters) => {
  try {
    if (filters === undefined) {
      const response = await api.get('/api/post/getAllPosts?');
      return response.data;
    } else {
      const response = await api.get('/api/post/filtered', {
        params: {
          requiredSubject: filters.requiredSubject,
          helpSubjects: filters.helpSubjects,
          minRating: filters.rating,
          sortBy: filters.sortBy
        },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
      return response.data;
    }
  } catch (error) {
    console.error("Ошибка получения постов:", error.response?.data || error.message);
    throw error;
  }
}

export const updateUserProfile = async (user) => {
  try {
    const response = await api.post(`api/user/userUpdate`, user);
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