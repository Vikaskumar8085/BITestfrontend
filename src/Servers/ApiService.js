import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwttoken = localStorage.getItem("token");
    if (jwttoken) {
      config.headers.Authorization = `Bearer ${jwttoken}`;
    }

    return config;
  },
  (error) => {
    return new Promise.reject(error.message);
  }
);

export default axiosInstance;
