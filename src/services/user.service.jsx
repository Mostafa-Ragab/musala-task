
import api from "./api";

const API_URL = 'http://localhost:3000/'

const addUser = (user) => {
  return api.post(API_URL + 'auth/register', user);
};

const currentUser = () => {
  return api.get(API_URL + '/auth/me');
};


const login = (email, password) => {
  return api
    .post(API_URL + 'auth/login', {
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        const { token, refreshToken } = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};


const AuthService = {
  addUser,
  currentUser,
  login,
  logout
};

export default AuthService;
