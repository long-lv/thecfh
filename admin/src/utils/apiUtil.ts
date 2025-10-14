import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./tokenStorage";
// base url for api
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

// flag để tránh gọi refresh token nhiều lần
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// create axios instance with config default

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  withCredentials: true, // send cookies with request (httpOnly cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add access token to request header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      const refreshToken = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {}, // Body empty
        { withCredentials: true }
      );

      const { access_token } = refreshToken.data.data;
			console.log(refreshToken, 'refreshTokenrefreshTokenrefreshTokenrefreshTokenrefreshTokenrefreshToken');

      setAccessToken(access_token);
      resolve(access_token);
    } catch (error) {
      clearAccessToken();
      reject(error);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });
  return refreshPromise;
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const authEndpoints = ["/auth/login", "/auth/signup", "/auth/refresh"];
    const isAuthEndpoint = authEndpoints.some((path) =>
      originalRequest.url?.includes(path)
    );

    // If the error is 401 and the request is not a refresh token request
    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      try {
        // refresh token
        const newAccessToken = await refreshToken();
        // add new access token to request header
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// api methods - react query handle types

const ApiUtil = {
  get: (url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get(url, config).then((res) => res.data),

  post: (url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post(url, data, config).then((res) => res.data),

  put: (url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put(url, data, config).then((res) => res.data),

  delete: (url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete(url, config).then((res) => res.data),
};

export default ApiUtil;
