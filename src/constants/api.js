import axios from "axios";

const api = axios.create(
    {
        baseURL:  'https://puzzleute.xyz'
    }
)

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    
    return Promise.reject(error);
  });

export default api