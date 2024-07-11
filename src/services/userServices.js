import instance from './instance';
// src/services/userServices.js
import axios from 'axios';

axios.defaults.withCredentials = true;


// Register a new user
export const registerUser = (userData) => {
    console.log(userData);
  return instance.post('/auth/register', userData);
};

// Login a user
export const login = async (credentials) => {
  try{
      return await instance.post('/auth/login', credentials, { withCredentials: true });
      

  }
  catch(error){
        console.log(error);
  }
};

// Request a password reset link
export const forgotPassword = (email) => {
  return instance.post('/auth/forgot-password', { email });
};

// Reset the user's password
export const resetPassword = (token, newPassword) => {
  return instance.post(`/auth/reset-password/${token}`, { password: newPassword });
};

//getUrlStats
export const getUrls = () => {
    return instance.get(`/url/urls/`);
}

export const redirectUrl = (shortUrl) => {
    return instance.get(`/url/redirect/${shortUrl}`);
}

export const createShortUrl = async (longUrl) => {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await instance.post(
      'url/shorten',
      { longUrl },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  };

//export
