import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getFromStorage } from '../libs';
import toast from 'react-hot-toast';

// interface TokenResponse {
//   user?: any; // Adjust the type based on your actual response structure
// }

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Accept': 'application/json',
  },
});

// REQUEST INTERCEPTOR
http.interceptors.request.use((req): InternalAxiosRequestConfig => {
  const token = getFromStorage('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req;
}, err => Promise.reject(err));

// RESPONSE INTERCEPTOR
http.interceptors.response.use((res: AxiosResponse<any>) => {
  if ('user' in res.data) {
    toast.success(res.data.message);
  }

  return res;
}, err => {
  // console.log("AXIOS MODULE", err.response);

  if ('message' in err.response.data) {
    toast.error(err.response.data.message);
  }

  return Promise.reject(err);
});

export default http;
