import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

// Base API configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get token from cookie (mock implementation)
const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Mock token for development - replace with actual cookie reading logic
  const mockToken = 'mock-bearer-token-12345';
  
  // In real implementation, you would read from cookie:
  // const cookies = document.cookie.split(';');
  // const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
  // return tokenCookie ? tokenCookie.split('=')[1] : null;
  
  console.log('🍪 Getting token from cookie:', mockToken);
  return mockToken;
};

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Bearer token to headers
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });
      
      // Log token status
      if (token) {
        console.log('🔐 Bearer Token added:', `Bearer ${token}`);
      } else {
        console.log('⚠️ No Bearer Token found');
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as { message?: string } | undefined;
      const errorMessage = errorData?.message || error.message;
      const status = error.response.status;
      
      console.error('❌ API Error Response:', {
        status,
        message: errorMessage,
        data: error.response.data,
      });

      // Handle specific status codes
      switch (status) {
        case 401:
          console.warn('🔒 Unauthorized - Token may be expired');
          // You can redirect to login page here
          break;
        case 403:
          console.warn('🚫 Forbidden - Insufficient permissions');
          break;
        case 404:
          console.warn('🔍 Not Found - Resource not found');
          break;
        case 500:
          console.error('💥 Server Error - Internal server error');
          break;
        default:
          console.error(`❌ HTTP Error ${status}: ${errorMessage}`);
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network Error:', error.message);
    } else {
      // Other error
      console.error('❌ Unknown Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // GET request
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // POST request
  post: async <T = unknown>(
    url: string, 
    data?: unknown, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // PUT request
  put: async <T = unknown>(
    url: string, 
    data?: unknown, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // DELETE request
  delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: response.data?.message,
      };
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};

// Error handler
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    const errorData = error.response.data as { message?: string } | undefined;
    return {
      message: errorData?.message || error.message,
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      message: 'Network error - Please check your connection',
      status: 0,
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

// Export the axios instance for advanced usage
export { apiClient };

// Export default api object
export default api;
